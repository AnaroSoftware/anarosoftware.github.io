<template>
    <div class="custom-grid">
        <card-component v-for="(card, i) in cards" :key="i" :title="card.title" :description="card.description || ''"
            :icon="card.icon" always-light />
    </div>

    <div class="row items-center justify-between q-mt-md full-width">
        <div class="col-auto">
            <div class="text-dark subheader">Get 30-min intro call</div>
            <div class="q-mt-sm text-dark">Plan a 30-min call with us today without waiting!</div>
            <div class="text-dark">We will send you a confirmation e-mail with the confirmation and the
                calendar
                invite.</div>
        </div>
        <q-btn rounded label="Open calendar →" color="dark" text-color="white" class="q-px-lg q-py-sm" no-caps
            unelevated size="lg" @click="openCalendar" />
    </div>
</template>

<script lang="ts" setup>
import type { CardComponentType } from 'src/utils/types';
import CardComponent from '../atoms/CardComponent.vue';

const cards: CardComponentType[] = [
    {
        title: 'Plan a meeting',
        description: 'Pick the slot that is convenient for you. The availability information is always up to date.',
        icon: 'calendar_month',
    },
    {
        title: 'Get confirmed',
        description: 'The confirmation and the calendar invite will be instantly sent to your inbox.',
        icon: 'check_circle',
    },
    {
        title: 'Let\'s talk!',
        description: 'Join the meeting with us via the platform you prefer - Teams, Zoom or Google Meet.',
        icon: 'question_answer',
    },
];

const openCalendar = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Calendly.initPopupWidget({
        url: import.meta.env.CALENDLY_URL,
    });
};
</script>

<style lang="scss" scoped>
.custom-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
    gap: 10px;

    padding: 20px 0;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
}

.card {
    height: 100%;
}

.full-width {
    width: 100%;
    padding: 0 4px;
    font-size: 1rem;
    font-weight: 500;

    .subheader {
        font-weight: 900;
        font-size: 1.6rem;
    }
}
</style>
