/**
 * @Description: MaRouter
 * @Author: LXG
 * @Date: 2021-11-16
 * @LastEditors: LXG
 * @LastEditTime: 2021-11-16
 */

class MaRouter {
	/**
	 * @property {Array} routes 路由列表
	 */
	routes = [];
	/**
	 * @property {Function} pushHandler 前进守卫
	 * @private
	 * @param {Object} to 目标路由
	 * @param {Object} from 来源路由
	 * @param {Function} next 前进函数
	 */
	#pushHandler = function(to, from, next) {
		next();
	};
	/**
	 * @property {Function} getHandlerFrom 获取守卫中的来源路由
	 * @private
	 * @returns {Object} Route
	 */
	#getHandlerFrom = function() {
		let pages = getCurrentPages()
		let currentPage = pages[pages.length - 1]
		return this.getRoute('/' + currentPage.route);
	}

	constructor(routerConfig) {
		this.routes = routerConfig.routes || []

		console.log(this)
	}

	/**
	 * @description 格式化url中的参数
	 * @param {string} url URL
	 * @returns {object}
	 */
	formatUrlQuery(url) {
		if (!url) return {};

		let urlParams = {}
		let queryStr = url.split('?')[1]
		if (queryStr) {
			queryStr.split('&').forEach(cv => {
				let [k, v] = cv.split('=')
				k && v && (urlParams[k] = v);
			})
		}
		return urlParams;
	}
	/**
	 * @description 获取匹配的路由
	 * @param {string | object} option 匹配选项
	 */
	getRoute(option) {
		if (typeof option === 'string') {
			return this.routes.find(route => route.path === option.split('?')[0]);
		}
		if (Object.prototype.toString.call(option).includes('Object')) {
			if (option.path) {
				return this.routes.find(route => route.path === option.path.split('?')[0]);
			}
			if (option.name) {
				return this.routes.find(route => route.name === option.name);
			}
		}
		return;
	}

	/**
	 * @description 导航前进到一个新页面
	 * @param {string | object} option 跳转选项
	 */
	push(option) {
		if (!option) return;

		const _this = this
		let to = this.getRoute(option)
		let from = this.#getHandlerFrom()

		let gen = (function*(gConfig) {
			let new_gConfig = yield gConfig
			let new_to = _this.getRoute(new_gConfig)

			let url = new_to.path
			let urlParams = {}
			if (typeof new_gConfig === 'string') {
				urlParams = _this.formatUrlQuery(new_gConfig)
			}
			if (Object.prototype.toString.call(new_gConfig).includes('Object')) {
				new_gConfig.path && (urlParams = _this.formatUrlQuery(new_gConfig.path));
				if (new_gConfig.query) {
					Object.keys(new_gConfig.query).forEach(key => {
						urlParams[key] = new_gConfig.query[key]
					})
				}
			}
			urlParams = Object.entries(urlParams).map(cv => cv[0] + '=' + cv[1]).join('&')
			urlParams && (url += `?${urlParams}`);
			uni.navigateTo({
				url,
			})
		})(option)

		gen.next()
		this.#pushHandler(to, from, (newOption = option) => {
			gen.next(newOption)
		})
	}

	/**
	 * @description 设置前进守卫
	 * @param {Function} handler 新的前进守卫函数
	 */
	setPushHandler(handler) {
		this.#pushHandler = handler
	}
}

export default MaRouter
