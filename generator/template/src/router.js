import Vue from 'vue'
// Generate Vue Router routing automatically
import routes from 'vue-auto-routing'
// Lightweight layout resolver for Vue Router
import {
  createRouterLayout
} from 'vue-router-layout'
// Vue router extension for scenarios with international languages and dynamic titles
import {
  VueLangRouter,
  VueMetaInfo
} from 'vue-lang-meta-router'
import translations from './lang/translations'
import localizedURLs from './lang/localized-urls'

Vue.use(VueMetaInfo)

Vue.use(VueLangRouter, {
  defaultLanguage: 'en',
  translations,
  localizedURLs,
})


const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

export default new VueLangRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: RouterLayout,
      children: routes
    },
    {
      path: '*',
      component: () => import('./layouts/404')
    }
  ]
})