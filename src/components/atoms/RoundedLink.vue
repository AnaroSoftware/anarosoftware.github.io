<template>
    <div class="rounded-link bg-dark row justify-between items-center content-between">
        <span class="orange-dot" />
        <component :is="isLink ? 'a' : 'span'" class="text-light" :href="link">{{ props.text }}</component>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ text: string; link?: string | undefined }>();

const isLink = computed(() => !!props.link); 
</script>

<style lang="scss" scoped>
.orange-dot {
    width: 15px;
    height: 15px;
    background-color: $primary;
    border-radius: 100%;
}

.rounded-link {
    width: 300px !important;
    padding: 8px 18px;
    border-radius: 9999px;
}
</style>
