/**
 * @Description: http请求 全局管理
 * @Author: LXG
 * @Date: 2021-11-08
 * @LastEditors: LXG
 * @LastEditTime: 2021-11-08
 */

import MaHttper from './MaHttper.js'
import env from '@/env/index.module.js'

const httper = new MaHttper({
	// 默认请求头
	header: {
		appid: 'afc903d9d5e449488a3cf9a00c3d1294',
		appkey: '8cb4f61b-e89a-405b-acc8-4d992826c247',
		'content-type': 'application/json',
	},
	timeout: 20 * 1000, // 默认请求超时时长
	withCredentials: true, // 默认携带cookie(H5)
})

// 基础地址 --------------------
httper.baseUrl = env.ENVIRONMENT === 'dev' ? '/maApi' : env.API_BASE_URL
// end --------------------

// 拦截器 --------------------
httper.setReqInterceptor((config) => {
	// console.log('req interceptor:', config)

	// 修正请求地址
	//     补全请求地址
	new RegExp(/^http/).test(config.url) || (config.url = httper.baseUrl + config.url);

	return config;
})
httper.setRespInterceptor((resp) => {
	// console.log('resp interceptor:', resp)

	return resp.data;
})
// end --------------------

export default httper
