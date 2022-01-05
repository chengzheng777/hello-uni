import Vue from 'vue'
import App from './App'

import env from './env/index.module.js'
import maRouter from './router/index.js'
import maHttper from './httper/index.js'

Vue.prototype.$env = env
Vue.prototype.$maRouter = maRouter
Vue.prototype.$maHttper = maHttper

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
