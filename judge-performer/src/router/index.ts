import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import loginForm from '@/views/loginForm.vue';
import dashboard from '@/views/dashboard.vue';
import scoreform from '@/views/scoreform.vue';
import results from '@/views/results.vue';
import Callback from '@/views/callback.vue';
import Logout from '@/views/logout.vue';
import AdminPage from '@/views/adminPage.vue';
import { inject } from 'vue';
import { Auth0Client } from '@auth0/auth0-spa-js';

const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Login', component: loginForm },
  { path: '/callback', component: Callback },
  { path: '/dashboard', name: 'Dashboard', component: dashboard },
  {
    path: '/dashboard/:judgeId',
    name: 'Dashboard',
    component: dashboard,
  },
  { path: '/score/:performerId', name: 'ScoreForm', component: scoreform, props: true },
  { path: '/results', name: 'Results', component: results },
  { path: '/logout', component: Logout }, 
  // { path: '/admin', name: 'AdminPage', component: () => import('@/views/adminPage.vue'), meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin', name: 'AdminPage', component: AdminPage },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth0 = inject<Auth0Client>('auth0');

  if (to.path === '/dashboard' && auth0) {
    const isAuthenticated = await auth0.isAuthenticated();
    if (!isAuthenticated) {
      await auth0.loginWithRedirect();
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
