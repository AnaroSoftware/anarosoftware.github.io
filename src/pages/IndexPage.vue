<template>
  <q-page :style-fn="layoutFn">
    <entry-point />
    <our-services />
    <our-reviews />
  </q-page>
</template>

<script setup lang="ts">
import EntryPoint from 'src/components/EntryPoint.vue';
import OurServices from 'src/components/OurServices.vue';
import OurReviews from 'src/components/OurReviews.vue';

const layoutFn = (offset: number) => {
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
};
</script>
