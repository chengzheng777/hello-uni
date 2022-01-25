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
	 * @param {string | object} option 跳转选项
	 */
	#getParamsFromOption = function(option) {
		if (!option) return {};

		let params = {}
		if (typeof option === 'string') {
			params = this.#getParamsFromUrl(option)
		}
		if (Object.prototype.toString.call(option).includes('Object')) {
			option.path && (params = this.#getParamsFromUrl(option.path));
			if (option.query) {
				Object.keys(option.query).forEach(key => {
					params[key] = option.query[key] ?? ''
				})
			}
		}
		return params;
	}

	/**
	 * @property {Function} getParamsFromUrl 获取页面地址中的参数
	 * @private
	 * @param {string} url 页面地址
	 */
	#getParamsFromUrl = function(url) {
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
	 * @property {Function} push 跳转非tab新页面
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

			uni.navigateTo({
				url,
				events,
			})
		})(option)
		gen.next()

		this.guardHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	/**
	 * @property {Function} relaunch 关闭所有页面并跳转新页面
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

		this.guardHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	/**
	 * @property {Function} replace 关闭当前页面并跳转非tab新页面
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

		this.guardHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	/**
	 * @property {Function} switchTab 关闭所有非tab页面并跳转tab页面
	 * @param {string | object} option 跳转选项
	 * @param {string} option.name 路由名
	 * @param {string} option.path 页面地址
	 */
	switchTab = function(option) {
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

			uni.switchTab({
				url,
			})
		})(option)
		gen.next()

		this.guardHandler(to, from, (newOption = option) => {
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
	 * @description 获取匹配的页面路由
	 * @param {string | object} option 选项
	 * @returns {object}
	 */
	getRoute(option) {
		if (!option) return;

		let route = undefined
		if (typeof option === 'string') {
			route = this.#routes.find(route => route.path === option.split('?')[0]);
		}
		if (Object.prototype.toString.call(option).includes('Object')) {
			route = this.#routes.find(route => {
				return route.name === option.name || route.path === (option.path || '').split('?')[0];
			})
		}
		return route;
	}

	/**
	 * @description 获取所有页面路由
	 * @returns {object[]}
	 */
	getRoutes() {
		return this.#routes;
	}

	/**
	 * @description 全局路由守卫
	 * @param {object} to 目标路由
	 * @param {object} from 来源路由
	 * @param {Function} next 通行回调
	 */
	guardHandler(to, from, next) {
		next();
	};

	/**
	 * @description 设置全局路由守卫
	 * @param {Function} handler 执行函数
	 */
	setGuard(handler) {
		if (!handler || typeof handler !== 'function') {
			console.warn(`MaRouter.setGuard: invalid handler.`)
			return;
		}

		this.guardHandler = handler
	}

	/**
	 * @description 设置页面路由
	 * @param {object} newRoute 新页面路由
	 * @param {string} newRoute.name 路由名
	 * @param {string} newRoute.path 页面地址
	 * @returns {boolean}
	 */
	setRoute(newRoute) {
		if (!newRoute || !newRoute.name || !newRoute.path) {
			console.warn(`MaRouter.setRoute: invalid route.`)
			return false;
		}
		let nameIndex = this.#routes.findIndex(route => route.name === newRoute.name)
		let pathIndex = this.#routes.findIndex(route => route.path === newRoute.path)
		if (-1 < nameIndex && -1 < pathIndex && nameIndex !== pathIndex) {
			console.warn(`MaRouter.setRoute: invalid route.`)
			return false;
		}

		if (nameIndex === -1 && pathIndex === -1) {
			this.#routes.push(newRoute)
			return true;
		}
		this.#routes[Math.max(nameIndex, pathIndex)] = newRoute
		return true;
	}
}

export default MaRouter
