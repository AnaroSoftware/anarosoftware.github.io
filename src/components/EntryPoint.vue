<template>
    <div class="page column items-start justify-center">
        <img :src="$q.dark.mode === true ? logoDark : logoLight" alt="Anaro Software" width="520px" />
        <p class="caption q-mt-md">{{ t(`${routePrefix}_description`) }}</p>

        <q-btn unelevated rounded :label="t(`${routePrefix}_button`)" no-caps color="primary" size="lg"
            class="q-px-xl q-py-sm q-mt-md" />
    </div>
</template>

<script lang="ts" setup>
import { useRoutePrefix } from 'src/composables/useRoutePrefix';
import { useQuasar } from 'quasar';
import logoDark from 'src/assets/logo_dark.svg';
import logoLight from 'src/assets/logo_light.svg';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const { t } = useI18n();
const { routePrefix } = useRoutePrefix();
</script>

<style lang="scss" scoped>
.caption {
    max-width: 440px;
    font-size: 20px;
}

.page {
    height: 90vh;
}
</style>
