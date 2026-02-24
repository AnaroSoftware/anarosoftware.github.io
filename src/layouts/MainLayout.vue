<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <img class="pt-3" :src="$q.dark.mode === true ? logoDark : logoLight" alt="Anaro Software"
            style="width: 250px" />
        </q-toolbar-title>

        <q-btn flat stretch label="Our work" no-caps class="q-mr-sm" />
        <q-btn flat stretch label="Blog" no-caps class="q-mr-sm" />
        <q-btn flat stretch label="About us" no-caps class="q-mr-sm" />
        <q-btn flat stretch label="Contact" no-caps class="q-mr-sm" />
        <div style="width: 40px"></div>
        <q-select v-model="locale" :options="localeOptions" dense borderless emit-value map-options options-dense
          style="min-width: 50px" popup-content-style="border: none; box-shadow: none;" />
        <q-btn flat icon="dark_mode" round @click="$q.dark.toggle()" />
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import logoDark from 'src/assets/logo_dark.svg';
import logoLight from 'src/assets/logo_light.svg';

const $q = useQuasar();
const { locale } = useI18n({ useScope: 'global' });

const localeOptions = [
  { value: 'en-US', label: 'EN' },
  { value: 'nl-NL', label: 'NL' }
];
</script>
