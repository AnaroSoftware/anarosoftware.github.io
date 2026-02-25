<template>
    <div class="page">
        <h1 class="page-title text-h2 q-pb-sm">{{ t(`${routePrefix}_ourServicesPt1`) }} <span class="text-primary">{{
            t(`${routePrefix}_ourServicesPt2`) }}</span>
        </h1>

        <div class="cards-grid">
            <CardComponent v-for="(card, index) in cards" :key="index" :title="t(`${routePrefix}_${card.title}`)"
                :icon="card.icon">
                {{ t(`${routePrefix}_${card.description}`) }}
            </CardComponent>
        </div>

        <q-btn color="primary" unelevated rounded no-caps size="md" class="q-mt-xl q-px-lg" icon-right="arrow_forward"
            :label="t(`${routePrefix}_servicesBtn`)" />
    </div>
</template>

<script lang="ts" setup>
import { useRoutePrefix } from 'src/composables/useRoutePrefix';
import CardComponent from './atoms/CardComponent.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { routePrefix } = useRoutePrefix();

const cards = [
    {
        title: 'serviceTitle1',
        icon: 'terminal',
        description: 'serviceDescription1',
    },
    {
        title: 'serviceTitle2',
        icon: 'support_agent',
        description: 'serviceDescription2',
    },
    {
        title: 'serviceTitle3',
        icon: 'badge',
        description: 'serviceDescription3',
    },
    {
        title: 'serviceTitle4',
        icon: 'data_exploration',
        description: 'serviceDescription4',
    },
];
</script>

<style lang="scss" scoped>
.page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
}

.page-title {
    text-align: center;
    font-weight: 700;
    margin-bottom: 26px;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

@media (max-width: 768px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }
}
</style>
