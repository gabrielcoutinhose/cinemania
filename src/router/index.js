import { createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
