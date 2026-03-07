import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/home',
    name: 'home',
    component:() => import('../components/HomeView.vue'),
  },
  { 
  path: '/about',
  name: 'about',
   
    component: () => import('../components/About.vue'),

  },
    {

     path: '/login',
     name: 'login',
     component: () => import('../components/Login.vue'),


    },
    { 
      path: '/',
      name: 'pokemon',
      component: () => import('../components/Pokemon.vue'),
      

    },
    { 
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: () => import('../Views/PokeView.vue'),
      

    },

  




  ],
})

export default router
