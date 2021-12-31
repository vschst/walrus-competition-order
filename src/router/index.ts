import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/competition/:id',
    name: 'competition',
    component: () => import(/* webpackChunkName: "competition" */ '../views/Competition/Main.vue'),
    children: [
      {
        path: 'orders',
        name: 'competition-orders',
        component: () => import(/* webpackChunkName: "orders" */ '../views/Competition/Orders/Main.vue')
      },
      {
        path: 'protocols',
        name: 'competition-protocols',
        component: () => import(/* webpackChunkName: "protocols" */ '../views/Competition/Protocols/Main.vue')
      }
    ]
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order/Main.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
