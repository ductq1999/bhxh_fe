import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4eccc905 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _7a836e2a = () => interopDefault(import('..\\pages\\starter-page.vue' /* webpackChunkName: "pages/starter-page" */))
const _6f3315b2 = () => interopDefault(import('..\\pages\\bhxh\\bat-buoc.vue' /* webpackChunkName: "pages/bhxh/bat-buoc" */))
const _e2bb0262 = () => interopDefault(import('..\\pages\\bhxh\\tu-nguyen.vue' /* webpackChunkName: "pages/bhxh/tu-nguyen" */))
const _c5ad47be = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/ar",
    component: _4eccc905,
    name: "index___ar"
  }, {
    path: "/starter-page",
    component: _7a836e2a,
    name: "starter-page___en"
  }, {
    path: "/ar/starter-page",
    component: _7a836e2a,
    name: "starter-page___ar"
  }, {
    path: "/bhxh/bat-buoc",
    component: _6f3315b2,
    name: "bhxh-bat-buoc___en"
  }, {
    path: "/bhxh/tu-nguyen",
    component: _e2bb0262,
    name: "bhxh-tu-nguyen___en"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _c5ad47be,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/bhxh/bat-buoc",
    component: _6f3315b2,
    name: "bhxh-bat-buoc___ar"
  }, {
    path: "/ar/bhxh/tu-nguyen",
    component: _e2bb0262,
    name: "bhxh-tu-nguyen___ar"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _c5ad47be,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _4eccc905,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
