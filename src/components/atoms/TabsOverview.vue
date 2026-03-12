<template>
    <q-tabs v-model="currentTab" no-caps inline-label active-class="active-class">
        <q-tab v-for="(tab, i) in tabs" :key="i" :name="tab.value" :icon="tab.icon" :label="tab.title"
            class="text-dark" />
    </q-tabs>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    modelValue: string;
    tabs: { title: string; value: string; icon?: string }[];
}

const props = defineProps<Props>();
const emit = defineEmits(['new-tab']);

// const currentTab = ref<string>(props.tabs[0]!.value);
const currentTab = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('new-tab', value);
    },
});
</script>

<style scoped lang="scss">
.q-tab {
    border-right: 2px solid $dark;
    opacity: 1 !important;
}

.q-tab:nth-of-type(1) {
    border-bottom-left-radius: 9999px;
    border-top-left-radius: 9999px;
}

.q-tab:nth-last-of-type(1) {
    border-bottom-right-radius: 9999px;
    border-top-right-radius: 9999px;
    border-right: none;
}

// White underline
.active-class {
    background-color: $dark;
    color: #fff !important;

    &::after {
        background: none !important;
    }
}
</style>
