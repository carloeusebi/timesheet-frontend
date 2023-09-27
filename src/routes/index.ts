import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './routes';
import { useAuthStore } from '@/stores';

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: '', //todo
});

// MIDDLEWARES

router.beforeEach((to, _from, next) => {
	const user = useAuthStore();

	// GUEST MIDDLEWARE
	if (to.meta.requiresGuest) {
		if (!user.isGuest) next({ name: 'home' });
		else next();
	}

	//USER MIDDLEWARE
	if (to.meta.requiresUser) {
		if (user.isGuest) next({ name: 'login' });
		else next();
	}

	//ADMIN MIDDLEWARE
});

export default router;
