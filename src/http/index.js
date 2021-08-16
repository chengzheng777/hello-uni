/**
 * @Description: http请求 全局管理
 * @Author: LXG
 * @Date: 2021-08-11
 * @Editors: LXG
 * @LastEditTime: 2021-08-11
 */

import env from '@/src/env/index.js'

// 请求队列集合
const reqQueue = new Map()

/**
 * @description: 通用请求
 * @param {String} method 请求方法
 * @param {String} url 请求地址
 * @param {Object} config 请求配置
 * @return {Promise}
 */
function commonRequest(method, url, config) {
	return new Promise((resolve, reject) => {
		const newConfig = {
			method: method,
			url: url,
			...config,
			header: {
				...(config.header || {}),
			},
		};
		/^http/.test(url) || (newConfig.url = env.API_BASE_URL + url);
		newConfig.complete = function(res) {
			reqQueue.delete(url)
			resolve(res.data)
		}
		reqQueue.has(url) && reqQueue.get(url).abort();
		let reqTask = uni.request(newConfig)
		reqQueue.set(url, reqTask)
	})
}
/**
 * @description: 通用get请求
 * @param {String} url api地址
 * @param {Object} params 请求参数
 * @param {Object} requestConfig 请求配置
 * @param {Object} customConfig 自定义配置
 * @return {Promise}
 */
function get(url, params, requestConfig = {}, customConfig) {
	return commonRequest('GET', url, {
		data: params,
		...requestConfig,
	})
}
/**
 * @description: 通用post请求
 * @param {String} url api地址
 * @param {Object} params 请求参数
 * @param {Object} requestConfig 请求配置
 * @param {Object} customConfig 自定义配置
 * @return {Promise}
 */
function post(url, params, requestConfig = {}, customConfig) {
	return commonRequest('POST', url, {
		data: params,
		...requestConfig,
	})
}

export default {
	commonRequest,
	get,
	post,
}
