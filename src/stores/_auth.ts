import { User } from '@/assets/interfaces';
import { defineStore } from 'pinia';

import { LoginForm } from '@/assets/interfaces';

export const useAuthStore = defineStore('auth', {
	/**
	 * STATE
	 */
	state: () => ({
		user: JSON.parse(localStorage.getItem('USER') as string) as User | null,
	}),

	/**
	 * GETTERS
	 */
	getters: {
		isUser: state => state.user,
		isAdmin: state => state.user?.role.role === 'admin',
		isGuest: state => !state.user,
	},

	/**
	 * ACTIONS
	 */
	actions: {
		/**
		 * Attempt Login.
		 */
		async login(credentials: LoginForm) {
			return this.axios
				.post('auth/login', credentials)
				.then(({ data }) => {
					this.user = data;
					localStorage.setItem('USER', JSON.stringify(data));

					this.router.push({ name: 'home' });
				})
				.catch(err => {
					throw err;
				});
		},

		/**
		 * Logout.
		 */
		async logout() {
			try {
				this.axios.post('auth/logout');
				this.removeUser();
			} catch (err) {
				console.error(err);
			}
		},

		/**
		 * Validates the User. It is called every time App component is mounted.
		 * If the User request returns a 401 (user is logged out on the backend) the axios instance will intercept the request and log out the front-end.
		 */
		validateUser() {
			if (this.isGuest) return;
			this.axios.get('auth/user');
		},

		/**
		 * Remove the user form the Local Store and redirect to the Login Page.
		 */
		removeUser() {
			this.user = null;
			localStorage.clear();

			this.router.push({ name: 'login' });
		},
	},
});
