import Vue from 'vue'
import App from './App'

import env from './env/index.module.js'
import http from './http/index.js'

import './common/css/global.scss'

Vue.prototype.$env = env
Vue.prototype.$http = http

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
