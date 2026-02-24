<template>
    <div>
        <img :src="$q.dark.mode === true ? logoDark : logoLight" alt="Anaro Software" width="520px" />
        <p class="caption q-mt-md">{{ t('description') }}</p>

        <q-btn unelevated rounded label="Plan a meeting with us" no-caps color="primary" size="lg"
            class="q-px-xl q-py-sm q-mt-md" />
    </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import logoDark from 'src/assets/logo_dark.svg';
import logoLight from 'src/assets/logo_light.svg';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.caption {
    max-width: 440px;
    font-size: 20px;
}
</style>
