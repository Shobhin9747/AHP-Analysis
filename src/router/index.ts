import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import MainLayout from '../pages/MainLayout.vue';
import Home from '../pages/Home.vue';
import Employee from '../pages/Employee.vue'
import Settings from '../pages/Settings.vue';
import { useAuthStore } from '../store/Auth';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/app',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: Home },
      { path: 'employee', name: 'Employee', component: Employee },
      { path: 'settings', name: 'Settings', component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  // If route requires auth and user is not authenticated, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.isAuthenticated) {
    next({ path: '/' });
  } 
  // If user is authenticated and tries to access login page, redirect to /app
  else if (to.path === '/' && auth.isAuthenticated) {
    next({ path: '/app' });
  } else {
    next();
  }
});

export default router;
