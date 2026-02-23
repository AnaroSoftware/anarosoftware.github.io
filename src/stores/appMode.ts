import { defineStore } from "pinia";

export type AppMode = 'light' | 'dark'; 

export const useAppModeStore = defineStore('appMode', {
    state: () => ({
        mode: 'light',
    }),

    getters: {
        getAppMode: (state) => state.mode,
    },

    actions: {
        setAppMode(mode: AppMode) {
            this.mode = mode;
        },
    },
});
