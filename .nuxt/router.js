import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4e9bcb19 = () => interopDefault(import('..\\pages\\admin\\adminusers\\index.vue' /* webpackChunkName: "pages/admin/adminusers/index" */))
const _04dfb352 = () => interopDefault(import('..\\pages\\admin\\ads\\index.vue' /* webpackChunkName: "pages/admin/ads/index" */))
const _555c7c88 = () => interopDefault(import('..\\pages\\admin\\bankdetails\\index.vue' /* webpackChunkName: "pages/admin/bankdetails/index" */))
const _502038ee = () => interopDefault(import('..\\pages\\admin\\dashboard\\index.vue' /* webpackChunkName: "pages/admin/dashboard/index" */))
const _723e7a18 = () => interopDefault(import('..\\pages\\admin\\projects\\index.vue' /* webpackChunkName: "pages/admin/projects/index" */))
const _44bb603a = () => interopDefault(import('..\\pages\\admin\\property_types\\index.vue' /* webpackChunkName: "pages/admin/property_types/index" */))
const _651da710 = () => interopDefault(import('..\\pages\\admin\\sliders\\index.vue' /* webpackChunkName: "pages/admin/sliders/index" */))
const _7960450d = () => interopDefault(import('..\\pages\\admin\\socities\\index.vue' /* webpackChunkName: "pages/admin/socities/index" */))
const _68d6de6a = () => interopDefault(import('..\\pages\\admin\\ads\\activeads.vue' /* webpackChunkName: "pages/admin/ads/activeads" */))
const _193d7e9f = () => interopDefault(import('..\\pages\\admin\\ads\\allads.vue' /* webpackChunkName: "pages/admin/ads/allads" */))
const _22e05b78 = () => interopDefault(import('..\\pages\\admin\\ads\\disableads.vue' /* webpackChunkName: "pages/admin/ads/disableads" */))
const _dcfa9cf0 = () => interopDefault(import('..\\pages\\admin\\ads\\emptyquantityads.vue' /* webpackChunkName: "pages/admin/ads/emptyquantityads" */))
const _04c8c4f0 = () => interopDefault(import('..\\pages\\admin\\ads\\searchads.vue' /* webpackChunkName: "pages/admin/ads/searchads" */))
const _1baa2341 = () => interopDefault(import('..\\pages\\admin\\auth\\login.vue' /* webpackChunkName: "pages/admin/auth/login" */))
const _45aa23a3 = () => interopDefault(import('..\\pages\\admin\\purchases\\allpurchases.vue' /* webpackChunkName: "pages/admin/purchases/allpurchases" */))
const _42e74ade = () => interopDefault(import('..\\pages\\admin\\purchases\\awaiting.vue' /* webpackChunkName: "pages/admin/purchases/awaiting" */))
const _5d613329 = () => interopDefault(import('..\\pages\\admin\\purchases\\completed.vue' /* webpackChunkName: "pages/admin/purchases/completed" */))
const _12b179f5 = () => interopDefault(import('..\\pages\\admin\\purchases\\pending.vue' /* webpackChunkName: "pages/admin/purchases/pending" */))
const _77a1b35f = () => interopDefault(import('..\\pages\\admin\\users\\signupusers\\unverifiedusers.vue' /* webpackChunkName: "pages/admin/users/signupusers/unverifiedusers" */))
const _91994650 = () => interopDefault(import('..\\pages\\admin\\users\\signupusers\\verifiedusers.vue' /* webpackChunkName: "pages/admin/users/signupusers/verifiedusers" */))
const _126c9552 = () => interopDefault(import('..\\pages\\admin\\users\\signupusers\\_id.vue' /* webpackChunkName: "pages/admin/users/signupusers/_id" */))
const _45768a33 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4e9bcb19,
    name: "admin-adminusers"
  }, {
    path: "/admin/ads",
    component: _04dfb352,
    name: "admin-ads"
  }, {
    path: "/admin/bankdetails",
    component: _555c7c88,
    name: "admin-bankdetails"
  }, {
    path: "/admin/dashboard",
    component: _502038ee,
    name: "admin-dashboard"
  }, {
    path: "/admin/projects",
    component: _723e7a18,
    name: "admin-projects"
  }, {
    path: "/admin/property_types",
    component: _44bb603a,
    name: "admin-property_types"
  }, {
    path: "/admin/sliders",
    component: _651da710,
    name: "admin-sliders"
  }, {
    path: "/admin/socities",
    component: _7960450d,
    name: "admin-socities"
  }, {
    path: "/admin/ads/activeads",
    component: _68d6de6a,
    name: "admin-ads-activeads"
  }, {
    path: "/admin/ads/allads",
    component: _193d7e9f,
    name: "admin-ads-allads"
  }, {
    path: "/admin/ads/disableads",
    component: _22e05b78,
    name: "admin-ads-disableads"
  }, {
    path: "/admin/ads/emptyquantityads",
    component: _dcfa9cf0,
    name: "admin-ads-emptyquantityads"
  }, {
    path: "/admin/ads/searchads",
    component: _04c8c4f0,
    name: "admin-ads-searchads"
  }, {
    path: "/admin/auth/login",
    component: _1baa2341,
    name: "admin-auth-login"
  }, {
    path: "/admin/purchases/allpurchases",
    component: _45aa23a3,
    name: "admin-purchases-allpurchases"
  }, {
    path: "/admin/purchases/awaiting",
    component: _42e74ade,
    name: "admin-purchases-awaiting"
  }, {
    path: "/admin/purchases/completed",
    component: _5d613329,
    name: "admin-purchases-completed"
  }, {
    path: "/admin/purchases/pending",
    component: _12b179f5,
    name: "admin-purchases-pending"
  }, {
    path: "/admin/users/signupusers/unverifiedusers",
    component: _77a1b35f,
    name: "admin-users-signupusers-unverifiedusers"
  }, {
    path: "/admin/users/signupusers/verifiedusers",
    component: _91994650,
    name: "admin-users-signupusers-verifiedusers"
  }, {
    path: "/admin/users/signupusers/:id?",
    component: _126c9552,
    name: "admin-users-signupusers-id"
  }, {
    path: "/",
    component: _45768a33,
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
