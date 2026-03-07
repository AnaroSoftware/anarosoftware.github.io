<template>
    <q-card flat bordered class="card" :class="inverseDark ? 'inverse-dark-card' : ''">
        <q-card-section class="row items-center justify-start q-pb-sm">
            <q-icon v-if="icon" :name="icon" color="primary" size="2.5rem" />
            <h2 class="text-h5 q-pl-md font-700">{{ title }}</h2>
            <slot name="title-right" />
        </q-card-section>

        <q-card-section class="q-pt-xs">
            <p class="desc">
                <slot />
            </p>
        </q-card-section>
    </q-card>
</template>

<script lang="ts" setup>
import type { CardComponentType } from 'src/utils/types';

defineProps<CardComponentType>();
</script>

<style lang="scss" scoped>
.desc {
    text-align: start !important;
}
</style>
