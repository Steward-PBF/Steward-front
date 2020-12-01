import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: { authenticationRequired: true },
    },
    {
      path: '/logowanie',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/rejestracja',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/przypomnij-haslo',
      name: 'remind-password',
      component: () => import('./views/PasswordReminder.vue'),
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.authenticationRequired && !store.getters.userIsLogged) {
    next({ name: 'login' });
  } else if (to.name === 'login' && store.getters.userIsLogged) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
