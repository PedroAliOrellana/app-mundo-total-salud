import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'profile',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'perfil',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        
        {
          path: '/solicitudes/afiliacion',
          name: 'afiliacion',
          component: () => import(/* webpackChunkName: "demo" */ './views/Afiliacion.vue')
        },
        {
          path: '/solicitudes/retiro',
          name: 'retiro',
          component: () => import(/* webpackChunkName: "demo" */ './views/Retiro.vue')
        },
        {
          path: '/auspicio',
          name: 'auspicio',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auspicio.vue')
        }
      ]
    },
    {
      path: '/identifcacion',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/identifcacion/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/identifcacion/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        },
        {
          path: '/identifcacion/confirmar',
          name: 'confirmar',
          component: () => import(/* webpackChunkName: "demo" */ './views/Confirmar.vue')
        }
      ]
    }
  ]
})
