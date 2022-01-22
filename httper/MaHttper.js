/*
 * @Description: MaHttper
 * @Author: LXG
 * @Date: 2022-01-04
 * @Editors: LXG
 * @LastEditTime: 2022-01-22
 */

class MaHttper {
	/**
	 * @property {object} defaultConfig 默认配置
	 */
	defaultConfig = {};

	/**
	 * @property {Map} requestMap 请求集合
	 * @private
	 */
	#requestMap = new Map();

	/**
	 * @property {object} interceptor 拦截器
	 * @private
	 * @property {Function} interceptor.request 请求拦截器
	 * @property {Function} interceptor.response 响应拦截器
	 */
	#interceptor = {
		request: function(config) {
			return config;
		},
		response: function(resp) {
			return resp;
		},
	};

	/**
	 * @property {Function} commonRequest 通用请求
	 * @param {string} method 请求方法
	 * @param {string} url 请求地址
	 * @param {object} config 请求配置
	 * @param {object} customConfig 自定义配置
	 * @param {boolean} [customConfig.unique = true] customConfig.unique 是否组内唯一请求
	 * @param {string} [customConfig.groupId = url] customConfig.groupId 请求组ID
	 * @param {string} [customConfig.requestId = Date.now().toString()] customConfig.requestId 请求ID
	 * @returns {Promise} Promise
	 */
	commonRequest = function(method, url, config = {}, customConfig = {}) {
		return new Promise((resolve, reject) => {
			config.header = {
				...(this.defaultConfig.header || {}),
				...(config.header || {}),
			}
			config = {
				...this.defaultConfig,
				...config,
			}
			const unique = customConfig.unique ?? true
			const groupId = customConfig.groupId || url
			const requestId = customConfig.requestId || Date.now().toString()
			this.abortRequest({
				groupId,
				requestId: unique ? '' : requestId,
			})

			const _this = this
			let requestConfig = {
				method,
				url,
				...config,
				success: function(resp) {
					_this.abortRequest({
						groupId,
						requestId
					})
					resolve(_this.#interceptor.response(resp) || resp);
				},
				fail: function(err) {
					if (err.errMsg.includes('abort')) return;
					_this.abortRequest({
						groupId,
						requestId
					})
					reject(err);
				},
			}
			Promise.resolve(this.#interceptor.request(requestConfig) || requestConfig)
				.then(newRequestConfig => {
					this.abortRequest({
						groupId,
						requestId: unique ? '' : requestId,
					})
					let requestTask = uni.request(newRequestConfig)
					let group = this.#requestMap.get(groupId) || []
					group.push({
						requestId,
						requestTask,
					})
					this.#requestMap.set(groupId, group)
				}).catch(err => {
					console.error('reqInterceptor error:', err)
					this.abortRequest({
						groupId,
						requestId: unique ? '' : requestId,
					})
					reject(err);
				})
		})
	}

	/**
	 * @property {Function} get 通用get请求
	 * @param {string} url 请求地址
	 * @param {object} params 请求参数
	 * @param {object} config 请求配置
	 * @param {object} customConfig 自定义配置
	 * @returns {Promise} Promise
	 */
	get = function(url, params, config = {}, customConfig) {
		config.data = params
		return this.commonRequest('GET', url, config, customConfig);
	}

	/**
	 * @property {Function} post 通用post请求
	 * @param {string} url 请求地址
	 * @param {object} data 请求参数
	 * @param {object} config 请求配置
	 * @param {object} customConfig 自定义配置
	 * @returns {Promise} Promise
	 */
	post = function(url, data, config = {}, customConfig) {
		config.data = data
		return this.commonRequest('POST', url, config, customConfig);
	}

	/**
	 * @property {Function} put 通用put请求
	 * @param {string} url 请求地址
	 * @param {object} data 请求参数
	 * @param {object} config 请求配置
	 * @param {object} customConfig 自定义配置
	 * @returns {Promise} Promise
	 */
	put = function(url, data, config = {}, customConfig) {
		config.data = data
		return this.commonRequest('PUT', url, config, customConfig);
	}

	/**
	 * @property {Function} delete 通用delete请求
	 * @param {string} url 请求地址
	 * @param {object} data 请求参数
	 * @param {object} config 请求配置
	 * @param {object} customConfig 自定义配置
	 * @returns {Promise} Promise
	 */
	delete = function(url, data, config = {}, customConfig) {
		config.data = data
		return this.commonRequest('DELETE', url, config, customConfig);
	}

	/**
	 * @property {Function} abortRequest 中止请求
	 * @param {object} option 选项
	 * @param {string} option.groupId 请求组ID
	 * @param {string} option.requestId 请求ID
	 */
	abortRequest = function(option) {
		if (!option.groupId) return;

		const groupId = option.groupId
		let group = this.#requestMap.get(groupId) || []
		if (!option.requestId) {
			for (let i = 0, length = group.length; i < length; i++) {
				group[i].requestTask.abort()
			}
			this.#requestMap.delete(groupId)
			return;
		}

		const requestId = option.requestId
		group = group.filter(cv => {
			if (cv.requestId === requestId) {
				cv.requestTask.abort()
				return false;
			}
			return true;
		})
		if (group.length) {
			this.#requestMap.set(groupId, group)
		} else {
			this.#requestMap.delete(groupId)
		}
	}

	// --------------------------------------------------

	constructor(defaultConfig = {}) {
		this.defaultConfig = JSON.parse(JSON.stringify(defaultConfig))

		console.log(this)
	}

	/**
	 * @description 设置请求拦截器
	 * @param {Function} handler 拦截函数
	 */
	setReqInterceptor(handler) {
		if (!handler) {
			console.error(`setReqInterceptor: 'handler' is not a function.`)
			return;
		}
		this.#interceptor.request = handler
	}

	/**
	 * @description 设置响应拦截器
	 * @param {Function} handler 拦截函数
	 */
	setRespInterceptor(handler) {
		if (!handler) {
			console.error(`setRespInterceptor: 'handler' is not a function.`)
		}
		this.#interceptor.response = handler
	}
}

export default MaHttper
