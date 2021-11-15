import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _bd4bfe8a = () => interopDefault(import('..\\pages\\admin\\adminusers\\index.vue' /* webpackChunkName: "pages/admin/adminusers/index" */))
const _bd30a020 = () => interopDefault(import('..\\pages\\admin\\ads\\index.vue' /* webpackChunkName: "pages/admin/ads/index" */))
const _4b4b7f4c = () => interopDefault(import('..\\pages\\admin\\bankdetails\\index.vue' /* webpackChunkName: "pages/admin/bankdetails/index" */))
const _73d3c70c = () => interopDefault(import('..\\pages\\admin\\dashboard\\index.vue' /* webpackChunkName: "pages/admin/dashboard/index" */))
const _b61c9f8c = () => interopDefault(import('..\\pages\\admin\\projects\\index.vue' /* webpackChunkName: "pages/admin/projects/index" */))
const _d5ae36f6 = () => interopDefault(import('..\\pages\\admin\\property_types\\index.vue' /* webpackChunkName: "pages/admin/property_types/index" */))
const _4dfa24ae = () => interopDefault(import('..\\pages\\admin\\sliders\\index.vue' /* webpackChunkName: "pages/admin/sliders/index" */))
const _a7d909a2 = () => interopDefault(import('..\\pages\\admin\\socities\\index.vue' /* webpackChunkName: "pages/admin/socities/index" */))
const _51b35c08 = () => interopDefault(import('..\\pages\\admin\\ads\\activeads.vue' /* webpackChunkName: "pages/admin/ads/activeads" */))
const _0db515c1 = () => interopDefault(import('..\\pages\\admin\\ads\\allads.vue' /* webpackChunkName: "pages/admin/ads/allads" */))
const _5593919a = () => interopDefault(import('..\\pages\\admin\\ads\\disableads.vue' /* webpackChunkName: "pages/admin/ads/disableads" */))
const _4909462a = () => interopDefault(import('..\\pages\\admin\\ads\\emptyquantityads.vue' /* webpackChunkName: "pages/admin/ads/emptyquantityads" */))
const _330fc9b4 = () => interopDefault(import('..\\pages\\admin\\ads\\searchads.vue' /* webpackChunkName: "pages/admin/ads/searchads" */))
const _1021ba63 = () => interopDefault(import('..\\pages\\admin\\auth\\login.vue' /* webpackChunkName: "pages/admin/auth/login" */))
const _35de17c5 = () => interopDefault(import('..\\pages\\admin\\purchases\\allpurchases.vue' /* webpackChunkName: "pages/admin/purchases/allpurchases" */))
const _4222c000 = () => interopDefault(import('..\\pages\\admin\\purchases\\awaiting.vue' /* webpackChunkName: "pages/admin/purchases/awaiting" */))
const _42448247 = () => interopDefault(import('..\\pages\\admin\\purchases\\completed.vue' /* webpackChunkName: "pages/admin/purchases/completed" */))
const _17b9f893 = () => interopDefault(import('..\\pages\\admin\\purchases\\pending.vue' /* webpackChunkName: "pages/admin/purchases/pending" */))
const _42ee8481 = () => interopDefault(import('..\\pages\\admin\\users\\signupusers\\unverifiedusers.vue' /* webpackChunkName: "pages/admin/users/signupusers/unverifiedusers" */))
const _04660e7a = () => interopDefault(import('..\\pages\\admin\\users\\signupusers\\verifiedusers.vue' /* webpackChunkName: "pages/admin/users/signupusers/verifiedusers" */))
const _02a08974 = () => interopDefault(import('..\\pages\\admin\\users\\signupusers\\_id.vue' /* webpackChunkName: "pages/admin/users/signupusers/_id" */))
const _298e03d1 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin/adminusers",
    component: _bd4bfe8a,
    name: "admin-adminusers"
  }, {
    path: "/admin/ads",
    component: _bd30a020,
    name: "admin-ads"
  }, {
    path: "/admin/bankdetails",
    component: _4b4b7f4c,
    name: "admin-bankdetails"
  }, {
    path: "/admin/dashboard",
    component: _73d3c70c,
    name: "admin-dashboard"
  }, {
    path: "/admin/projects",
    component: _b61c9f8c,
    name: "admin-projects"
  }, {
    path: "/admin/property_types",
    component: _d5ae36f6,
    name: "admin-property_types"
  }, {
    path: "/admin/sliders",
    component: _4dfa24ae,
    name: "admin-sliders"
  }, {
    path: "/admin/socities",
    component: _a7d909a2,
    name: "admin-socities"
  }, {
    path: "/admin/ads/activeads",
    component: _51b35c08,
    name: "admin-ads-activeads"
  }, {
    path: "/admin/ads/allads",
    component: _0db515c1,
    name: "admin-ads-allads"
  }, {
    path: "/admin/ads/disableads",
    component: _5593919a,
    name: "admin-ads-disableads"
  }, {
    path: "/admin/ads/emptyquantityads",
    component: _4909462a,
    name: "admin-ads-emptyquantityads"
  }, {
    path: "/admin/ads/searchads",
    component: _330fc9b4,
    name: "admin-ads-searchads"
  }, {
    path: "/admin/auth/login",
    component: _1021ba63,
    name: "admin-auth-login"
  }, {
    path: "/admin/purchases/allpurchases",
    component: _35de17c5,
    name: "admin-purchases-allpurchases"
  }, {
    path: "/admin/purchases/awaiting",
    component: _4222c000,
    name: "admin-purchases-awaiting"
  }, {
    path: "/admin/purchases/completed",
    component: _42448247,
    name: "admin-purchases-completed"
  }, {
    path: "/admin/purchases/pending",
    component: _17b9f893,
    name: "admin-purchases-pending"
  }, {
    path: "/admin/users/signupusers/unverifiedusers",
    component: _42ee8481,
    name: "admin-users-signupusers-unverifiedusers"
  }, {
    path: "/admin/users/signupusers/verifiedusers",
    component: _04660e7a,
    name: "admin-users-signupusers-verifiedusers"
  }, {
    path: "/admin/users/signupusers/:id?",
    component: _02a08974,
    name: "admin-users-signupusers-id"
  }, {
    path: "/",
    component: _298e03d1,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
