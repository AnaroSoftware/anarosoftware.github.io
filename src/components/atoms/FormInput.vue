<template>
    <div class="custom-input column justify-start items-start content-start">
        <label class="text-dark">{{ computedLabel }}</label>
        <q-input v-model="computedValue" bg-color="white" color="dark" input-class="text-dark q-px-sm" :type="type"
            :rows="2" :autogrow="false" :rules="computedRules" reactive-rules />
    </div>
</template>

<script lang="ts" setup>
import type { ValidationRule } from 'quasar';
import { isRequired } from 'src/utils/validations';
import { computed } from 'vue';

type RuleFn = (value: unknown) => true | string;
type RuleType = RuleFn | 'isRequired';

interface Props {
    modelValue: string;
    label: string;
    type?: 'textarea' | 'tel' | undefined;
    rules?: RuleType[];
}

const props = withDefaults(defineProps<Props>(), {
    rules: () => [],
    type: undefined,
});
const emit = defineEmits(['update:modelValue']);

const rulesSet = new Set(props.rules);
const hasIsRequired = rulesSet.has('isRequired');

const computedLabel = computed(() => hasIsRequired ? `${props.label} *` : props.label);

const computedRules = computed<ValidationRule[]>(() => {
    rulesSet.delete('isRequired');
    if (hasIsRequired) rulesSet.add(isRequired);
    return [...rulesSet] as ValidationRule[];
});

const computedValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value);
    },
});
</script>

<style lang="scss" scoped>
.custom-input {
    width: 100%;
    margin-bottom: 10px;

    .q-field {
        width: 100%;
    }

    label {
        font-weight: 600;
    }
}

textarea {
    resize: none !important;
    max-height: 40px !important;
    height: 40px !important;
}
</style>
