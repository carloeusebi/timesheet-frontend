import MainLayout from '@/layouts/MainLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import TimesheetDetails from '@/pages/TimesheetDetails.vue';
import TimesheetCreate from '@/pages/TimesheetCreate.vue';
import DashboardPage from '@/pages/DashboardPage.vue';
import ForbiddenPage from '@/pages/ForbiddenPage.vue';
import ProjectsDetails from '@/pages/ProjectsDetails.vue';
import ProjectCreate from '@/pages/ProjectCreate.vue';
import UserDetails from '@/pages/UserDetails.vue';
import UserCreate from '@/pages/UserCreate.vue';
import ActivityDetails from '@/pages/ActivityDetails.vue';
import ActivityCreate from '@/pages/ActivityCreate.vue';

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
  {
    path: '/admin',
    component: MainLayout,
    meta: {
      requiresAdmin: true,
    },
    children: [
      { path: '/dashboard', component: DashboardPage, name: 'dashboard' },
      {
        path: '/projects/:id',
        component: ProjectsDetails,
        name: 'projects-details',
      },
      {
        path: '/projects/create',
        component: ProjectCreate,
        name: 'projects-create',
      },
      { path: '/users/:id', component: UserDetails, name: 'users-details' },
      { path: '/users/create', component: UserCreate, name: 'users-create' },
      {
        path: '/activities/:id',
        component: ActivityDetails,
        name: 'activities-details',
      },
      {
        path: '/activities/create',
        component: ActivityCreate,
        name: 'activities-create',
      },
    ],
  },
  {
    path: '/forbidden',
    component: ForbiddenPage,
    name: 'forbidden',
  },
];
