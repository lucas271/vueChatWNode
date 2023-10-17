// Composables
import { useUserStore } from '@/store/userStore'
import { createRouter, createWebHistory } from 'vue-router'
import { useFriendRequestStore } from '@/store/friendRequestStore';
import { useFriendShipStore } from '@/store/friendshipStore';
import {io} from 'socket.io-client'

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
  const friendShipStore = useFriendShipStore()
  friendShipStore.getFriends(userStore.user?.id || '')

  const socket = io("http://localhost:3001") 
  socket.on("connect", () => console.log('aaaaaaaaaaaaaa'))
  socket.on("friendRequest", () => console.log('it was received'))
  console.log(socket)

  if(userStore.user?.id) await friendRequestStore.getRequests(userStore.user?.id || '')

  if (to.meta.requiresAuth && userStore.isLogged) {
    next('/');
  } else {
    next();
  }

  if(to.meta.requiresUser){
    const {getUsers} = useUserStore()
    await getUsers(0)
  }
})

export default router
