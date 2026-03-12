<template>
    <q-form class="custom-form">
        <div class="form-grid">
            <div class="column justify-between left-col">
                <div>
                    <form-input v-model="payload.fullName" label="Full name" :rules="['isRequired']" />
                    <form-input v-model="payload.email" label="E-mail" :rules="['isRequired', validateEmail]" />
                    <form-input v-model="payload.phoneNumber" label="Phone number"
                        :rules="['isRequired', validatePhoneNumber]" />
                </div>

            </div>
            <form-input v-model="payload.question" label="Your question" type="textarea" class="right-col"
                :rules="['isRequired']" />
        </div>

        <q-btn rounded label="Ask a question →" color="dark" text-color="white" class="q-px-lg q-py-sm" no-caps
            unelevated style="align-self: flex-start" size="lg" />
    </q-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FormInput from '../atoms/FormInput.vue';
import { validateEmail, validatePhoneNumber } from 'src/utils/validations';

interface PayloadType {
    fullName: string;
    email: string;
    phoneNumber: string;
    question: string;
}

const payload = ref<PayloadType>({ fullName: '', email: '', phoneNumber: '', question: '' });
</script>

<style lang="scss" scoped>
.custom-form {
    padding: 20px 0;
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    gap: 24px;
    flex: 1;
}

.left-col {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.right-col {
    display: flex;
    flex-direction: column;
    height: 98.5%;

    :deep(.q-field) {
        flex: 1;
        min-height: 0;
    }

    :deep(.q-field__inner),
    :deep(.q-field__control) {
        height: 98.5% !important;
    }

    :deep(textarea) {
        height: 98.5% !important;
        resize: none;
    }
}
</style>
