/**
 * @Description: http请求 全局管理
 * @Author: LXG
 * @Date: 2021-11-08
 * @LastEditors: LXG
 * @LastEditTime: 2021-11-08
 */

import env from '@/env/index.module.js'

// 默认请求配置 --------------------
const DEFAULT_CONFIG = {
	// 默认请求头
	header: {
		appid: 'afc903d9d5e449488a3cf9a00c3d1294',
		appkey: '8cb4f61b-e89a-405b-acc8-4d992826c247',
	},
	timeout: 20 * 1000, // 默认请求超时时长
	withCredentials: true, // 默认携带cookie(H5)
}
// end --------------------

// http请求基础地址 --------------------
let baseUrl = '/maApi'
if (env.ENVIRONMENT !== 'dev') {
	baseUrl = env.API_BASE_URL
}
// end --------------------

// 请求集合 --------------------
const REQUEST_MAP = new Map()
// end --------------------

// 拦截器 --------------------
function requestInterceptor(config) {
	// console.log('req interceptor:', config)

	// 修正请求地址
	//     1、补全请求地址
	new RegExp(/^http/).test(config.url) || (config.url = baseUrl + config.url);

	return config;
}

function responseInterceptor(res) {
	// console.log('res interceptor:', res)
	return res.data;
}
// end --------------------

/**
 * @description 通用请求
 * @param {string} method 请求方法
 * @param {string} url 请求地址
 * @param {object} config 请求配置
 * @param {object} customConfig 自定义配置
 * @returns {Promise} Promise
 */
function commonRequest(method, url, config = {}, customConfig = {}) {
	return new Promise((resolve, reject) => {
		config.header = {
			...DEFAULT_CONFIG.header,
			...(config.header || {}),
		}
		config = {
			...DEFAULT_CONFIG,
			...config,
		}

		// 唯一机制：由unique标识，abortId关联，中止所有旧请求，默认开启
		// 中止机制：由abortId、requestId关联，中止指定请求
		let unique = customConfig.unique ?? true
		let abortId = customConfig.abortId || url
		let abortGroup = REQUEST_MAP.get(abortId) || []
		let requestId = customConfig.requestId || Date.now().toString()
		if (unique) {
			for (let i = 0; i < abortGroup.length; i++) {
				abortGroup[i].requestTask.abort()
			}
			abortGroup = []
		}

		let requestConfig = {
			method,
			url,
			...config,
			success: function(res) {
				removeRequest()
				resolve(responseInterceptor(res));
			},
			fail: function(err) {
				// console.error('request fail:', err)
				if (err.errMsg.includes('abort')) return;
				removeRequest()
				reject(err);
			}
		}
		Promise.resolve(requestInterceptor(requestConfig) || requestConfig).then(newRequestConfig => {
			let requestTask = uni.request(newRequestConfig)
			abortGroup.push({
				requestId: requestId,
				requestTask: requestTask,
			})
			REQUEST_MAP.set(abortId, abortGroup)
		}).catch(err => {
			console.error('request interceptor error:', err)
			reject(err);
		})

		function removeRequest() {
			let abortGroup_new = (REQUEST_MAP.get(abortId) || []).filter(cv => cv.requestId !== requestId)
			if (abortGroup_new.length) {
				REQUEST_MAP.set(abortId, abortGroup_new)
			} else {
				REQUEST_MAP.delete(abortId)
			}
		}
	})
}

/**
 * @description: 通用get请求
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {object} config 请求配置
 * @param {object} customConfig 自定义配置
 * @returns {Promise} Promise
 */
function get(url, params = {}, config = {}, customConfig) {
	config.data = params
	return commonRequest('GET', url, config, customConfig);
}

/**
 * @description: 通用post请求
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @param {object} config 请求配置
 * @param {object} customConfig 自定义配置
 * @returns {Promise} Promise
 */
function post(url, data = {}, config = {}, customConfig) {
	config.data = data
	return commonRequest('POST', url, config, customConfig);
}

export default {
	baseUrl,
	commonRequest,
	get,
	post,
}
