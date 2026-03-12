<template>
    <div class="page column items-start">
        <div class="container row wrap justify-between content-between items-center q-pa-0 q-ma-0">
            <!-- Header -->
            <h1><span class="text-light">Let's</span> <span class="text-dark">Connect</span></h1>

            <!-- Links -->
            <div class="column items-center justify-end content-end">
                <span v-for="(link, i) in links" :key="i" class="q-mb-sm">
                    <rounded-link :link="link.link" :text="link.text" />
                </span>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs-container">
            <tabs-overview v-model="currentTab" :tabs="tabs" @new-tab="(newTab) => currentTab = newTab" />
        </div>

        <!-- Tabs views -->
        <plan-meeting v-if="currentTab === 'meeting'" />
        <ask-question v-if="currentTab === 'question'" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RoundedLink from './atoms/RoundedLink.vue';
import TabsOverview from './atoms/TabsOverview.vue';
import PlanMeeting from './contactUsTabs/PlanMeeting.vue';
import AskQuestion from './contactUsTabs/AskQuestion.vue';

const links = [
    { text: '(+31) 6 44 444 44 4' },
    // TODO fix, doesn't open (what's our email?)
    { text: 'anarosoftware@gmail.com', link: 'mailto:anarosoftware@gmail.com' },
];

const tabs = [
    { title: 'Plan a meeting', value: 'meeting', icon: 'calendar_month' },
    { title: 'Ask a question', value: 'question', icon: 'question_answer' },
];

const currentTab = ref<string>(tabs[0]!.value);
</script>


<style lang="scss" scoped>
.page {
    background-color: $primary;
    height: 90vh;
    padding: 0 26px;
}

.container {
    width: 100%;
}

.tabs-container {
    border-radius: 9999px;
    border: 2px solid $dark;
}

h1 {
    line-height: 2rem !important;
}
</style>
