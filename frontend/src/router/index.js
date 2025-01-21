import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import AnnouncementPage from '@/views/AnnouncementPage.vue';
import CreateAnnouncement from '../views/CreateAnnouncement.vue';
import UpdateAnnouncement from '../views/UpdateAnnouncement.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/announcement/create',
      name: 'announcementCreate',
      component: CreateAnnouncement
    },
    {
      path: '/announcement/:id',
      name: 'announcementDetail',
      component: AnnouncementPage
    },
    {
      path: '/announcement/:id/update',
      name: 'announcementUpdate',
      component: UpdateAnnouncement
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  if (!store.getters.isAuthLoaded)
    await store.dispatch('checkAuth');

  if (store.getters.isAuthenticated && to.path === '/login')
    return next('/');

  if (!store.getters.isAuthenticated && to.path !== '/login') {
    return next('/login');
  }

  next();
});
export default router
