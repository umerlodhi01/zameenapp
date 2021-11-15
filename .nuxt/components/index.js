export const SharedSidebar = () => import('../..\\components\\shared\\Sidebar.vue' /* webpackChunkName: "components/shared-sidebar" */).then(c => wrapFunctional(c.default || c))
export const SharedTopbar = () => import('../..\\components\\shared\\Topbar.vue' /* webpackChunkName: "components/shared-topbar" */).then(c => wrapFunctional(c.default || c))
export const AdminAdsEditad = () => import('../..\\components\\admin\\ads\\editad.vue' /* webpackChunkName: "components/admin-ads-editad" */).then(c => wrapFunctional(c.default || c))
export const AdminAdsViewdialog = () => import('../..\\components\\admin\\ads\\viewdialog.vue' /* webpackChunkName: "components/admin-ads-viewdialog" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
