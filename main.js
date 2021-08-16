import Vue from 'vue'
import App from './App'
import env from './src/env/index.js'
import http from './src/http/index.js'

import uView from 'uview-ui'

Vue.prototype.$env = env
Vue.prototype.$http = http

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(uView)

const app = new Vue({
	...App
})
app.$mount()
