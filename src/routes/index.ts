import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './routes';
import { useAuthStore } from '@/stores';

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'active',
});

// MIDDLEWARES

router.beforeEach((to, _from, next) => {
	const user = useAuthStore();

	// GUEST MIDDLEWARE
	if (to.meta.requiresGuest) {
		if (!user.isGuest) return next({ name: 'home' });
		else return next();
	}

	// USER MIDDLEWARE
	if (to.meta.requiresUser) {
		if (user.isGuest) {
			return next({ name: 'login' });
		}

		if (to.meta.forbidsAdmin && user.isAdmin) {
			return next({ name: 'home' });
		}
	}

	//ADMIN MIDDLEWARE
	if (to.meta.requiresAdmin) {
		if (user.isAdmin) return next();
		else return next({ name: 'forbidden' });
	}

	next();
});

export default router;
