<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <a href="/">
            <img class="pt-3" :src="$q.dark.mode === true ? logoDark : logoLight" alt="Anaro Software"
              style="width: 250px" />
          </a>
        </q-toolbar-title>

        <q-btn v-for="(route, index) in routesLinks" :key="index" flat stretch no-caps class="q-mr-sm"
          :label="t(route.meta.name)" @click="router.push({ name: route.name })" />

        <div style="width: 40px"></div>
        <q-select v-model="locale" :options="localeOptions" dense borderless emit-value map-options options-dense
          style="min-width: 50px" popup-content-style="border: none; box-shadow: none;" />
        <q-btn flat icon="dark_mode" round @click="toggleTheme" />
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-lg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import logoDark from 'src/assets/logo_dark.svg';
import logoLight from 'src/assets/logo_light.svg';
import { useRouter } from 'vue-router';
import routes, { type ChildRecord } from 'src/router/routes';
import { onMounted, ref, watch } from 'vue';
import { useLocalStorage } from 'src/storage/localStorage';
import type { LanguageType } from '@/utils/types';

const $q = useQuasar();
const { locale, t } = useI18n({ useScope: 'global' });
const router = useRouter();
const { getItem, setItem } = useLocalStorage();

const localeOptions = [
  { value: 'en-US', label: 'EN' },
  { value: 'nl-NL', label: 'NL' }
];

const routesLinks = ref<ChildRecord[]>([]);

const toggleTheme = (): void => {
  const currentMode = $q.dark.isActive;
  $q.dark.set(!currentMode);
  setItem('mode', !currentMode ? 'dark' : 'light');
};

watch(() => locale.value, () => {
  setItem('language', locale.value as LanguageType);
});

onMounted(() => {
  const routesMainPages = routes[0]?.children;
  if (routesMainPages) {
    routesLinks.value = routesMainPages.filter((route) => route.meta?.includeInLinks) as ChildRecord[];
  }

  const configuredMode = getItem('mode');
  $q.dark.set(configuredMode === 'dark');

  const configuredLanguage = getItem('language');
  locale.value = configuredLanguage || 'en-US';
});
</script>
