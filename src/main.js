import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import '@/assets/css/main.css'
import '@/assets/css/media-query.css'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

import instance from '@/plugins/axios.js'
// import { values } from 'core-js/core/array';

Vue.prototype.$axios = instance
Vue.prototype.$toastify = Toastify
    // Vue.use(http)

Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')