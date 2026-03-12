<template>
    <div class="carousel-wrapper">
        <!-- Carousel itself -->
        <div class="carousel" ref="carouselRef" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
            <div class="track" :style="trackStyle" @transitionend="handleTransitionEnd">
                <CardComponent v-for="(card, index) in carouselItems" :key="index" :title="card?.title ?? ''"
                    inverse-dark :style="{ width: cardWidth + 'px' }" :icon="card?.icon">
                    <div class="description" :class="!showScrollbar(card?.description || '') ? 'hide-scrollbar' : ''">
                        {{
                            card?.description }}
                    </div>

                    <template #title-right v-if="card?.rating">
                        <q-space />
                        <q-rating readonly :model-value="card.rating" size="2em" color="primary" icon="star" />
                    </template>
                </CardComponent>
            </div>
        </div>

        <div class="controllers">
            <!-- Left arrow -->
            <q-btn flat round size="xl" icon="navigate_before" @click="previous" />

            <div class="dots">
                <span v-for="(_item, i) in cards" :key="i" class="dot" :class="{ active: realIndex === i }"
                    @click="goTo(i)" />
            </div>

            <!-- Right arrow -->
            <q-btn flat round size="xl" icon="navigate_next" @click="next" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CardComponentType } from 'src/utils/types';
import CardComponent from './CardComponent.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
    cards: Array<CardComponentType & { rating?: number; }>;
}
const props = defineProps<Props>();

// Constants
const WIDTH_COEFFICIENT = 0.6;
const MAX_WIDTH = 700;
const GAP = 40;
const AUTOPLAY_DELAY = 5000;
const MAX_DESCRIPTION_LENGTH = 420;

// Variables required for the functionality of the page
const carouselRef = ref<HTMLElement | null>(null);
const autoplayTimer = ref<ReturnType<typeof setInterval> | null>(null);

const viewportWidth = ref(0);
const cardWidth = ref(0);
const index = ref(1);
const transitioning = ref(true);
const isAnimating = ref(false);

/**
 * Sets the card and scroll area sizes
 */
const updateSizes = (): void => {
    viewportWidth.value = carouselRef.value?.offsetWidth ?? 0;
    cardWidth.value = Math.min(viewportWidth.value * WIDTH_COEFFICIENT, MAX_WIDTH);
};

// Adds the last card to the beginning of the cards and the first one to the end of the cards
// in order to imitate the infinite scroll behavior
const carouselItems = computed(() => ([
    props.cards[props.cards.length - 1],
    ...props.cards,
    props.cards[0],
]));

// Adds styles to the track
const trackStyle = computed(() => {
    // Get the position of the card that is in the center of the track (viewport)
    // taking the gap into consideration
    const centerOffset = (viewportWidth.value - cardWidth.value) / 2;

    return {
        transform: `translateX(${centerOffset - index.value * (cardWidth.value + GAP)}px)`,
        transition: transitioning.value ? `transform 0.4s ease` : 'none',
    };
});

// Returns the real index of the current card
const realIndex = computed(() => {
    if (index.value === 0) return props.cards.length - 1;
    if (index.value === props.cards.length + 1) return 0;
    return index.value - 1;
});

/**
 * Scrolls to the next card
 */
const next = (): void => {
    if (isAnimating.value) return;
    stopAutoplay();

    isAnimating.value = true;
    index.value++;

    startAutoplay();
};

/**
 * Scrolls to the previous card
 */
const previous = (): void => {
    if (isAnimating.value) return;
    stopAutoplay();

    isAnimating.value = true;
    index.value--;

    startAutoplay();
};

/**
 * Scrolls to the certain card
 * @param i Index of the card to scroll to
 */
const goTo = (i: number): void => {
    if (isAnimating.value) return;
    stopAutoplay();

    isAnimating.value = true;
    index.value = i + 1;

    startAutoplay();
};

/**
 * Stops the automatic scroll of the cards
 */
const stopAutoplay = (): void => {
    if (autoplayTimer.value) {
        clearInterval(autoplayTimer.value);
        autoplayTimer.value = null;
    }
};

/**
 * Starts the automatic scroll of the cards
 */
const startAutoplay = (): void => {
    stopAutoplay();

    autoplayTimer.value = setInterval(() => {
        if (!isAnimating.value) {
            next();
        }
    }, AUTOPLAY_DELAY);
};

/**
 * Handles the situation when the transition ends
 */
const handleTransitionEnd = (): void => {
    isAnimating.value = false;

    if (index.value === 0) {
        transitioning.value = false;
        index.value = props.cards.length;
    }

    if (index.value === props.cards.length + 1) {
        transitioning.value = false;
        index.value = 1;
    }

    requestAnimationFrame(() => {
        transitioning.value = true;
    });
}

// Makes sure the index cannot be less than 0 or more than the length of the cards array
// in order to prevent the weird behavior that can take place when the prev/next button is spammed
watch(() => index.value, () => {
    if (index.value < 0) index.value = 0;
    if (index.value > props.cards.length + 1)
        index.value = props.cards.length + 1;
});

/**
 * Returns true when the amount of chars in card description is too big so that the scrollbar should be displayed
 * @param text Text to calculate the amountof chars of
 */
const showScrollbar = (text: string): boolean => text.length > MAX_DESCRIPTION_LENGTH;

onMounted(() => {
    updateSizes();
    window.addEventListener('resize', updateSizes);
    startAutoplay();
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSizes);
    stopAutoplay();
});
</script>

<style lang="scss" scoped>
.carousel-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.carousel {
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;

    .card {
        height: 260px;
        display: flex;
        flex-direction: column;
    }

    .description {
        margin-left: 14px;
        font-size: 1rem;
        height: 130px;
        overflow-y: scroll;
    }
}

.hide-scrollbar {
    &::-webkit-scrollbar {
        visibility: hidden;
    }
}

.track {
    display: flex;
    align-items: center;
    gap: 40px;
}

.controllers {
    padding-right: 30%;
    padding-left: 30%;
    margin-top: 40px;

    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dots {
        display: flex;
        justify-content: center;
        gap: 10px;

        .dot {
            width: 10px;
            height: 10px;
            background: #ccc;
            border-radius: 50%;
            cursor: pointer;

            &.active {
                background-color: $primary;
            }
        }
    }
}
</style>
