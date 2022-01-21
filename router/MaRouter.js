/**
 * @Description: MaRouter
 * @Author: LXG
 * @Date: 2021-11-16
 * @LastEditors: LXG
 * @LastEditTime: 2022-01-21
 */

class MaRouter {
	/**
	 * @property {object[]} routes 路由表
	 * @private
	 */
	#routes = [];

	/**
	 * @property {Function} getRoute 获取匹配路由
	 * @param {string | object} option 选项
	 * @returns {object}
	 */
	getRoute = function(option) {
		if (!option) return;

		if (typeof option === 'string') {
			return this.#routes.find(route => route.path === option.split('?')[0]);
		}
		if (Object.prototype.toString.call(option).includes('Object')) {
			return this.#routes.find(route => {
				return route.path === option.path.split('?')[0] || route.name === option.name;
			})
		}
		return;
	}

	/**
	 * @property {Function} push 导航前进新页面
	 * @param {string | object} option 跳转选项
	 */
	push = function(option) {
		if (!option) {
			console.warn(`MaRouter.push: 'option' isn't find.`)
			return;
		}

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
			let urlParams = {}
			let events = {}

			if (typeof new_option === 'string') {
				urlParams = _this.getParamsFromUrl(new_option)
			}
			if (Object.prototype.toString.call(new_option).includes('Object')) {
				new_option.path && (urlParams = _this.getParamsFromUrl(new_option.path));
				if (new_option.query) {
					Object.keys(new_option.query).forEach(key => {
						urlParams[key] = new_option.query[key] ?? ''
					})
				}
				new_option.events && (events = new_option.events);
			}
			urlParams = Object.entries(urlParams).map(cv => cv[0] + '=' + cv[1]).join('&')
			urlParams && (url += `?${urlParams}`);

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

	constructor(routerConfig) {
		this.#routes = routerConfig.routes || []

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
}

export default MaRouter
