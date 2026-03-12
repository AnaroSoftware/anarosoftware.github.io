<template>
    <q-card flat bordered class="card" :class="computedClass">
        <q-card-section class="row items-center justify-start q-pb-sm">
            <q-icon v-if="icon" :name="icon" :color="alwaysLight ? 'dark' : 'primary'" size="2.5rem" />
            <h2 class="text-h5 q-pl-md font-700">{{ title }}</h2>
            <slot name="title-right" />
        </q-card-section>

        <q-card-section class="q-pt-xs">
            <p class="desc">
                <slot>{{ description }}</slot>
            </p>
        </q-card-section>
    </q-card>
</template>

<script lang="ts" setup>
import type { CardComponentType } from 'src/utils/types';
import { computed } from 'vue';

const props = defineProps<CardComponentType>();

const computedClass = computed(() => {
    if (props.inverseDark) return 'inverse-dark-card';
    if (props.alwaysLight) return 'always-light-card';
    return '';
});
</script>

<style lang="scss" scoped>
.desc {
    text-align: start !important;
}
</style>
