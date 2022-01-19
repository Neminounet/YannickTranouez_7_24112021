import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Post from '../views/Post.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
