import MainLayout from '@/layouts/MainLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';

export const routes = [
	// LOGIN PAGE
	{
		path: '/login',
		component: LoginPage,
		name: 'login',
		meta: {
			requiresGuest: true,
		},
	},
	// HOMEPAGE
	{
		path: '/',
		component: MainLayout,
		name: 'main-layout',
		meta: {
			requiresUser: true,
		},
		children: [
			{
				path: '/',
				component: HomePage,
				name: 'home',
				meta: {
					requiresUser: true,
				},
			},
		],
	},
];
