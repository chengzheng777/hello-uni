import Vue from 'vue'
import store from './store'
import App from './App'

import env from './env/index.module.js'
import maRouter from './router/index.js'
import maHttper from './httper/index.js'

Vue.prototype.$store = store
Vue.prototype.$env = env
Vue.prototype.$maRouter = maRouter
Vue.prototype.$maHttper = maHttper

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
