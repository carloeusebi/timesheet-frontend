import MainLayout from '@/layouts/MainLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import TimesheetDetails from '@/pages/TimesheetDetails.vue';
import TimesheetCreate from '@/pages/TimesheetCreate.vue';

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
				component: TimesheetDetails,
				name: 'timesheet-details',
			},
			{
				path: '/timesheets/create',
				component: TimesheetCreate,
				name: 'timesheet-create',
				meta: {
					forbidsAdmin: true,
				},
			},
		],
	},
];
