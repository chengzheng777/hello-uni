import Vue from 'vue'
import App from './App'

import env from './env/index.module.js'
import MaRouter from './router/index.js'
import http from './http/index.js'

Vue.prototype.$env = env
Vue.prototype.$maRouter = MaRouter
Vue.prototype.$http = http

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
