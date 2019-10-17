import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _05e83fa7 = () => interopDefault(import('../pages/marvelCharacters.js' /* webpackChunkName: "pages/marvelCharacters" */))
const _432ac543 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/marvelCharacters",
    component: _05e83fa7,
    name: "marvelCharacters"
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
