import axiosInstance from '@/assets/axios';
import router from '@/routes';
import { AxiosInstance } from 'axios';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import { Router } from 'vue-router';
import { useAuthStore } from './_auth';

declare module 'pinia' {
	export interface PiniaCustomProperties {
		router: Router;
		axios: AxiosInstance;
	}
}

const pinia = createPinia();

pinia.use(({ store }) => {
	store.router = markRaw(router);
	store.axios = markRaw(axiosInstance);
});

export { pinia, useAuthStore };
