/**
 * @Description: vuex状态管理库 - 数据字典
 * @Author: LXG
 * @Date: 2022-01-25
 * @LastEditors: LXG
 * @LastEditTime: 2022-01-25
 */

import Vue from 'vue'
import static_dict from './static_dict.json'

const dictionary = {
	namespaced: true,
	state: () => ({}),
	getters: {
		/**
		 * @description 获取数据标签
		 * @param {string} type 字典类型
		 * @param {*} value 数据值
		 * @returns {string}
		 */
		getDictLabel: (state) => (type, value) => {
			if (!type) return;

			if (static_dict[type]) {
				let option = static_dict[type].find(cv => cv.value === value)
				return option ? option.label : '';
			}

			if (!state[type]) Vue.set(state, type, [])
			let option = state[type].find(cv => cv.value === value)
			return option ? option.label : '';
		},
		/**
		 * @description 获取数据集合
		 * @param {string} type 字典类型
		 * @returns {object[]}
		 */
		getDictList: (state) => (type) => {
			if (!type) return;

			if (static_dict[type]) return static_dict[type];

			if (!state[type]) Vue.set(state, type, [])
			return state[type];
		},
	},
	mutations: {
		/**
		 * @description 设置字典
		 * @param {string} type 字典类型
		 * @param {object[]} data 数据集合
		 */
		'SET_DICT'(state, payload) {
			if (!payload.type) return;

			Vue.set(state, payload.type, payload.data || [])
		},
	},
	actions: {
		/**
		 * @description: 加载数据集合
		 * @param {object} context 上下文对象
		 * @param {string[]} types 字典类型
		 * @return {Promise}
		 */
		loadDict(context, payload) {
			return new Promise((resolve, reject) => {
				resolve()
			})
		},
	},
}

export default dictionary
