// Composables
import { useUserStore } from '@/store/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useFriendRequestStore } from '@/store/friendRequestStore';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
    
  },
  {
    path: '/searchUsers',
    component: () => import('@/views/SearchUsers.vue'),
    meta: {requiresUser: true}
  },
  {
    path: '/auth',
    component: () => import('@/views/Auth.vue'),
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const friendRequestStore = useFriendRequestStore()
  userStore.getUser()
  if(userStore.user?.id) await friendRequestStore.getRequests(userStore.user?.id || '')

  if (to.meta.requiresAuth && userStore.isLogged) {
    next('/');
  } else {
    next();
  }

  if(to.meta.requiresUser){
    const {getUsers} = useUserStore()
    const {limit} = storeToRefs(useUserStore())
    await getUsers(0)
  }
})

export default router
