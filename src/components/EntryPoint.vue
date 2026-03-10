<template>
    <section style="position: relative; overflow: hidden; margin: 0; padding: 0; height: 100vh;">
        <BinaryBackground :shape-points="backgroundPoints" />

        <!-- Your actual content sits on top -->
        <div style="position: relative; z-index: 1;">
            <div class="page column items-start justify-center">
                <img :src="$q.dark.mode === true ? logoDark : logoLight" alt="Anaro Software" width="700px" />
                <p class="caption q-mt-md">{{ t(`${routePrefix}_description`) }}</p>

                <q-btn unelevated rounded :label="t(`${routePrefix}_button`)" no-caps color="primary" size="lg"
                    class="q-px-xl q-py-sm q-mt-md" />
            </div>
        </div>
    </section>

</template>

<script lang="ts" setup>
import { useRoutePrefix } from 'src/composables/useRoutePrefix';
import { useQuasar } from 'quasar';
import logoDark from 'src/assets/logo_dark.svg';
import logoLight from 'src/assets/logo_light.svg';
import { useI18n } from 'vue-i18n';
import BinaryBackground, { type ShapePoint } from 'src/components/atoms/BinaryBackground.vue';

const $q = useQuasar();
const { t } = useI18n();
const { routePrefix } = useRoutePrefix();

const backgroundPoints: ShapePoint[] = [
    { type: 'sharp', x: 0.00, y: 0.00 },
    { type: 'sharp', x: 1.00, y: 0.00 },
    { type: 'sharp', x: 1.00, y: 1.00 },
    { type: 'sharp', x: 0.54, y: 1.00 },
    { type: 'sharp', x: 0.54, y: 0.30 },
    { type: 'sharp', x: 0.0, y: 0.30 },
    { type: 'sharp', x: 0.0, y: 0.20 },
];
</script>

<style lang="scss" scoped>
.caption {
    max-width: 600px;
    font-size: 30px;
}

.page {
    height: 85vh;
    margin-top: 6.8rem;
    margin-left: 3.5rem;
}
</style>
