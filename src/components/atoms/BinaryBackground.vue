<template>
  <canvas ref="canvasRef" class="binary-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// --- Types ---
interface Char {
  x: number;
  y: number;
  value: '0' | '1';
}

interface Mouse {
  x: number;
  y: number;
}

// A sharp point connects to the next point with a straight line.
interface SharpPoint {
  type: 'sharp';
  x: number;
  y: number;
}

// A smooth point curves INTO this point from the previous one using a quadratic bezier.
// cx/cy is the bezier control point (fractions 0–1, same as x/y).
interface SmoothPoint {
  type: 'smooth';
  x: number;
  y: number;
  cx: number;
  cy: number;
}

export type ShapePoint = SharpPoint | SmoothPoint;

// How many interpolated steps to generate along each bezier curve segment.
// Higher = smoother boundary, slightly more work at resize time (not per frame).
const BEZIER_STEPS = 60;

// --- Props ---
const props = withDefaults(
  defineProps<{
    shapePoints?: ShapePoint[];
  }>(),
  {
    shapePoints: () => [
      { type: 'sharp', x: 0.50, y: 0.00 },
      { type: 'sharp', x: 1.00, y: 0.00 },
      { type: 'sharp', x: 1.00, y: 1.00 },
      { type: 'sharp', x: 0.20, y: 1.00 },
    ],
  }
);

// --- Config ---
const FONT_SIZE = 14;
const COL_GAP = 10;
const ROW_GAP = 20;
const RADIUS = 180;
const COLOR_DEFAULT = '#d0d0d0';
const COLOR_LIT: [number, number, number] = [255, 135, 1];

// --- Refs & mutable state ---
const canvasRef = ref<HTMLCanvasElement | null>(null);

let ctx: CanvasRenderingContext2D | null = null;
let chars: Char[] = [];
const mouse: Mouse = { x: -9999, y: -9999 };
let animFrameId: number | null = null;
let resizeObserver: ResizeObserver | null = null;

// Expanded polygon — rebuilt on resize, reused every draw frame.
// Smooth points are expanded into many small straight segments here so that
// isInsidePolygon stays a simple ray-cast with no bezier math per frame.
let expandedPoly: [number, number][] = [];

// --- Shape expansion ---
// Converts ShapePoint[] + canvas dimensions into a flat array of pixel coords.
// Sharp points emit one vertex; smooth points emit BEZIER_STEPS vertices along
// the quadratic bezier from the previous point through cx/cy to x/y.
const buildExpandedPoly = (canvasW: number, canvasH: number): void => {
  const points = props.shapePoints;
  const result: [number, number][] = [];

  for (let i = 0; i < points.length; i++) {
    const curr = points[i] as ShapePoint;
    const prev = points[(i - 1 + points.length) % points.length] as ShapePoint;

    if (curr.type === 'sharp') {
      result.push([curr.x * canvasW, curr.y * canvasH]);
    } else {
      // Quadratic bezier from prev point → control point → curr point
      const x0 = prev.x * canvasW;
      const y0 = prev.y * canvasH;
      const cx = curr.cx * canvasW;
      const cy = curr.cy * canvasH;
      const x1 = curr.x * canvasW;
      const y1 = curr.y * canvasH;

      // Start at t=1/BEZIER_STEPS so we don't duplicate the prev point
      for (let step = 1; step <= BEZIER_STEPS; step++) {
        const t = step / BEZIER_STEPS;
        const mt = 1 - t;
        // Quadratic bezier formula: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
        const bx = mt * mt * x0 + 2 * mt * t * cx + t * t * x1;
        const by = mt * mt * y0 + 2 * mt * t * cy + t * t * y1;
        result.push([bx, by]);
      }
    }
  }

  expandedPoly = result;
}

// --- Helpers ---
const buildGrid = (canvas: HTMLCanvasElement): void => {
  const cols = Math.ceil(canvas.width / COL_GAP);
  // Add extra rows to ensure characters fill all the way to the bottom edge
  const rows = Math.ceil(canvas.height / ROW_GAP) + 2;

  chars = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      chars.push({
        x: c * COL_GAP + COL_GAP / 2,
        y: r * ROW_GAP,  // start at y=0, no offset
        value: Math.random() > 0.5 ? '1' : '0',
      });
    }
  }
}

const resize = (): void => {
  const canvas = canvasRef.value;
  if (canvas === null || ctx === null) return;

  // Size the canvas to its direct parent (the <section>).
  // We use offsetWidth/Height which reflects the section's true rendered size
  // driven by its content div, not by the canvas itself.
  const section = canvas.parentElement;
  if (section === null) return;

  const w = section.offsetWidth;
  const h = section.offsetHeight;

  if (w === 0 || h === 0) return;

  canvas.width = w;
  canvas.height = h;
  ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

  buildGrid(canvas);
  buildExpandedPoly(canvas.width, canvas.height);
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

const isInsidePolygon = (px: number, py: number): boolean => {
  const poly = expandedPoly;
  let inside = false;

  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i] as [number, number];
    const [xj, yj] = poly[j] as [number, number];
    const intersect =
      (yi > py) !== (yj > py) &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

// Cached default colour channels so we don't re-parse the hex string every frame
const DEFAULT_R = parseInt(COLOR_DEFAULT.slice(1, 3), 16);
const DEFAULT_G = parseInt(COLOR_DEFAULT.slice(3, 5), 16);
const DEFAULT_B = parseInt(COLOR_DEFAULT.slice(5, 7), 16);

const draw = (): void => {
  const canvas = canvasRef.value;
  if (canvas === null || ctx === null) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (const { x, y, value } of chars) {
    if (!isInsidePolygon(x, y)) continue;

    const dx = x - mouse.x;
    const dy = y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      const t = 1 - dist / RADIUS;
      const r = Math.round(lerp(DEFAULT_R, COLOR_LIT[0], t));
      const g = Math.round(lerp(DEFAULT_G, COLOR_LIT[1], t));
      const b = Math.round(lerp(DEFAULT_B, COLOR_LIT[2], t));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
    } else {
      ctx.fillStyle = COLOR_DEFAULT;
    }

    ctx.fillText(value, x, y);
  }

  animFrameId = requestAnimationFrame(draw);
}

// --- Mouse / Touch ---
const onMouseMove = (e: MouseEvent): void => {
  const canvas = canvasRef.value;
  if (canvas === null) return;
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}

const onMouseLeave = (): void => {
  mouse.x = -9999;
  mouse.y = -9999;
}

const onTouchMove = (e: TouchEvent): void => {
  const canvas = canvasRef.value;
  if (canvas === null) return;
  const touch = e.touches[0];
  if (touch === undefined) return;
  const rect = canvas.getBoundingClientRect();
  mouse.x = touch.clientX - rect.left;
  mouse.y = touch.clientY - rect.top;
}

// --- Lifecycle ---
onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas === null) return;

  const context = canvas.getContext('2d');
  if (context === null) return;
  ctx = context;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  // Use ResizeObserver as the single source of truth for sizing.
  // It fires immediately on observe() with the current size, so we don't need a
  // manual resize() call — it also fires again whenever the section grows due to
  // late-rendering content (e.g. q-page children mounting after this component).
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Only rebuild when the size actually changed meaningfully
      const newW = Math.ceil(entry.contentRect.width);
      const newH = Math.ceil(entry.contentRect.height);
      if (newW === canvas.width && newH === canvas.height) return;
      resize();
    }
  });

  // Observe the direct parent (the <section>) — this is what drives the height.
  const section = canvas.parentElement;
  if (section !== null) {
    resizeObserver.observe(section);
  }

  // Start the draw loop — resize() will be called by ResizeObserver immediately
  draw();
});

onUnmounted(() => {
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
  }

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseleave', onMouseLeave);
  window.removeEventListener('touchmove', onTouchMove);

  resizeObserver?.disconnect();
});
</script>

<style scoped>
.binary-canvas {
  position: absolute;
  top: 0;
  left: 0;
  /* width/height are set entirely via JS to match the section — no CSS sizing */
  z-index: 0;
  pointer-events: all;
  display: block;
}
</style>