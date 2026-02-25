<template>
  <q-page :style-fn="layoutFn" class="q-pa-md">
    <entry-point />
    <our-services />
  </q-page>
</template>

<script setup lang="ts">
import EntryPoint from 'src/components/EntryPoint.vue';
import OurServices from 'src/components/OurServices.vue';

const layoutFn = (offset: number) => {
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
};
</script>
