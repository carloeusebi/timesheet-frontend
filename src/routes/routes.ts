import MainLayout from '@/layouts/MainLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import TimesheetDetailsVue from '@/pages/TimesheetDetails.vue';

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
			},
			{
				path: '/timesheets/:id',
				component: TimesheetDetailsVue,
				name: 'timesheet-details',
			},
		],
	},
];
