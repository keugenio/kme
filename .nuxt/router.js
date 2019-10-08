import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _60f8436e = () => interopDefault(import('../pages/pepe.vue' /* webpackChunkName: "pages/pepe" */))
const _f90830f0 = () => interopDefault(import('../pages/products/_pid.vue' /* webpackChunkName: "pages/products/_pid" */))
const _432ac543 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/kme/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/pepe",
    component: _60f8436e,
    name: "pepe"
  }, {
    path: "/products/:pid?",
    component: _f90830f0,
    name: "products-pid"
  }, {
    path: "/",
    component: _432ac543,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
