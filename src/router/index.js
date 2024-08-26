import { createRouter, createWebHashHistory } from 'vue-router'
import StartPageView from "@/views/StartPageView.vue";
import ChangePageView from "@/views/ChangePageView.vue";
import SearchPageView from "@/views/SearchPageView.vue";

const routes = [
  {
    path: '/',
    name: 'start-page',
    component: StartPageView
  },
  {
    path: '/change',
    name: 'change-page',
    component: ChangePageView
  },
  {
    path: '/search',
    name: 'search-page',
    component: SearchPageView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
