import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			// Home Route
			name: 'Home',
			component: () => import('./views/Home.vue'),
			path: '/',
		},
		{
			// Room Route
			name: 'Room',
			component: () => import('./views/Room.vue'),
			path: '/room/:roomId',
		},
	],
});

router.beforeEach((to, _from, next) => {
	//Before each route, updates the title of page to match name attribute of route
	document.title = `${String(to.name)} | DiceGame`;

	next();
});

//Exports vue-router
export default router;
