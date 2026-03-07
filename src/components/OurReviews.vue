<template>
    <div class="page">
        <h1><strong>What Our <span class="text-primary">Clients</span> Say About Us</strong></h1>

        <CarouselComponent :cards="reviewsCards" />
    </div>
</template>

<script lang="ts" setup>
import { reviews } from 'src/data/reviews';
import CarouselComponent from './atoms/CarouselComponent.vue';

const reviewsCards = reviews.map((review) => ({
    title: `${review.author} @ ${review.company}`,
    description: review.review,
    rating: review.rating
}))
</script>

<style lang="scss" scoped>
.page {
    height: 90vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
}
</style>
