/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { rtdbPlugin } from 'vuefire'
import VueMeta from 'vue-meta'
import VuePwaInstallPlugin from "vue-pwa-install"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(VuePwaInstallPlugin)

Vue.use(VueMeta)

Vue.use(rtdbPlugin)

import SuiVue from 'semantic-ui-vue'

Vue.use(SuiVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
