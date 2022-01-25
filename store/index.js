/**
 * @Description: vuex状态管理库 全局管理
 * @Author: LXG
 * @Date: 2022-01-25
 * @LastEditors: LXG
 * @LastEditTime: 2022-01-25
 */

import Vue from 'vue'
import Vuex from 'vuex'
import dictionary from './modules/dictionary/dictionary.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		dictionary,
	},
})

export default store
