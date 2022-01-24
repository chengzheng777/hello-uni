/**
 * @Description: MaRouter
 * @Author: LXG
 * @Date: 2021-11-16
 * @LastEditors: LXG
 * @LastEditTime: 2022-01-24
 */

class MaRouter {
	/**
	 * @property {object[]} routes 路由表
	 * @private
	 */
	#routes = [];

	/**
	 * @property {Function} getParamsFromOption 获取跳转选项中的参数
	 * @private
	 * @param {string | object} option = 跳转选项
	 */
	#getParamsFromOption = function(option) {
		if (!option) return {};

		let params = {}
		if (typeof option === 'string') {
			params = this.getParamsFromUrl(option)
		}
		if (Object.prototype.toString.call(option).includes('Object')) {
			option.path && (params = this.getParamsFromUrl(option.path));
			if (option.query) {
				Object.keys(option.query).forEach(key => {
					params[key] = option.query[key] ?? ''
				})
			}
		}
		return params;
	}

	/**
	 * @property {Function} getRoute 获取匹配路由
	 * @param {string | object} option 选项
	 * @returns {object}
	 */
	getRoute = function(option) {
		if (!option) return;

		let route = undefined
		if (typeof option === 'string') {
			route = this.#routes.find(route => route.path === option.split('?')[0]);
		}
		if (Object.prototype.toString.call(option).includes('Object')) {
			route = this.#routes.find(route => {
				return route.path === (option.path || '').split('?')[0] || route.name === option.name;
			})
		}
		return route;
	}

	/**
	 * @property {Function} push 导航前进新页面
	 * @param {string | object} option 跳转选项
	 * @param {string} option.name 路由名
	 * @param {string} option.path 路由地址
	 * @param {object} option.query 跳转参数
	 * @param {object} option.events 页面通讯事件
	 */
	push = function(option) {
		const to = this.getRoute(option) || this.getRoute({
			name: '404',
		})
		if (!to) {
			console.warn(`MaRouter.push: can't match route in routes.`)
			return;
		}

		const pages = getCurrentPages()
		const from = this.getRoute('/' + pages[pages.length - 1]?.route)
		const _this = this

		let gen = (function*(gOption) {
			let new_option = yield gOption
			let new_to = _this.getRoute(new_option) || _this.getRoute({
				name: '404',
			})
			if (!new_to) {
				console.warn(`MaRouter.push: can't match route in routes.`)
				return;
			}

			let url = new_to.path
			let urlParams = _this.#getParamsFromOption(new_option)
			urlParams = Object.entries(urlParams).map(cv => cv[0] + '=' + cv[1]).join('&')
			urlParams && (url += `?${urlParams}`);
			let events = new_option.events || {}

			if (new_to?.meta.isTab) {
				uni.switchTab({
					url,
				})
			} else {
				uni.navigateTo({
					url,
					events,
				})
			}
		})(option)
		gen.next()

		this.pushHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	/**
	 * @property {Function} relaunch 关闭所有页面并导航前进新页面
	 * @param {string | object} option 跳转选项
	 * @param {string} option.name 路由名
	 * @param {string} option.path 路由地址
	 * @param {object} option.query 跳转参数
	 */
	relaunch = function(option) {
		const to = this.getRoute(option)
		if (!to) {
			console.warn(`MaRouter.push: can't match route in routes.`)
			return;
		}

		const pages = getCurrentPages()
		const from = this.getRoute('/' + pages[pages.length - 1]?.route)
		const _this = this

		let gen = (function*(gOption) {
			let new_option = yield gOption
			let new_to = _this.getRoute(new_option)
			if (!new_to) {
				console.warn(`MaRouter.push: can't match route in routes.`)
				return;
			}

			let url = new_to.path
			let urlParams = _this.#getParamsFromOption(new_option)
			urlParams = Object.entries(urlParams).map(cv => cv[0] + '=' + cv[1]).join('&')
			urlParams && (url += `?${urlParams}`);

			uni.reLaunch({
				url,
			})
		})(option)
		gen.next()

		this.pushHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	/**
	 * @property {Function} replace 关闭当前页面并导航前进新页面
	 * @param {string | object} option 跳转选项
	 * @param {string} option.name 路由名
	 * @param {string} option.path 路由地址
	 * @param {object} option.query 跳转参数
	 */
	replace = function(option) {
		const to = this.getRoute(option)
		if (!to) {
			console.warn(`MaRouter.push: can't match route in routes.`)
			return;
		}

		const pages = getCurrentPages()
		const from = this.getRoute('/' + pages[pages.length - 1]?.route)
		const _this = this

		let gen = (function*(gOption) {
			let new_option = yield gOption
			let new_to = _this.getRoute(new_option)
			if (!new_to) {
				console.warn(`MaRouter.push: can't match route in routes.`)
				return;
			}

			let url = new_to.path
			let urlParams = _this.#getParamsFromOption(new_option)
			urlParams = Object.entries(urlParams).map(cv => cv[0] + '=' + cv[1]).join('&')
			urlParams && (url += `?${urlParams}`);

			uni.redirectTo({
				url,
			})
		})(option)
		gen.next()

		this.pushHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	constructor(routerConfig) {
		(routerConfig.routes || []).forEach(cv => {
			if (cv.name && cv.path) {
				let index = this.#routes.findIndex(route => {
					return route.name === cv.name || route.path === cv.path;
				})
				if (-1 < index) this.#routes.splice(index, 1)
				this.#routes.push({
					...cv,
				})
			}
		})

		console.log(this)
	}

	/**
	 * @description 获取url中的参数
	 * @param {string} url URL
	 * @returns {object}
	 */
	getParamsFromUrl(url) {
		if (!url) return {};

		let params = {}
		let paramStr = url.split('?')[1]
		if (paramStr) {
			paramStr.split('&').filter(cv => cv).forEach(cv => {
				let [k, v] = cv.split('=')
				k && (params[k] = v ?? '');
			})
		}
		return params;
	}

	/**
	 * @description 前进守卫
	 * @param {object} to 目标路由
	 * @param {object} from 来源路由
	 * @param {Function} next 前进函数
	 */
	pushHandler(to, from, next) {
		next();
	};

	/**
	 * @description 设置前进守卫
	 * @param {Function} handler 新的前进守卫函数
	 */
	setPushHandler(handler) {
		this.pushHandler = handler
	}

	/**
	 * @description 设置页面路由
	 * @param {object} route 页面路由
	 */
	setRoute(route) {
		if (!route || !route.name || !route.path) {
			console.warn(`MaRouter.setRoute: invalid route.`)
			return;
		}

		let index = this.#routes.findIndex(cv => cv.name === route.name)
		if (-1 < index) {
			this.#routes[index] = route
			return;
		}
		this.#routes.push(route)
	}
}

export default MaRouter
