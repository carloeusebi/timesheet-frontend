import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
	state: () => ({
		isLoading: true,
	}),

	actions: {
		setLoader() {
			this.isLoading = true;
		},
		unsetLoader() {
			this.isLoading = false;
		},
	},
});
