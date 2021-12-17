/**
 * @Description: ma路由器 全局管理
 * @Author: LXG
 * @Date: 2021-11-08
 * @LastEditors: LXG
 * @LastEditTime: 2021-11-08
 */

import MaRouter from './MaRouter.js'
import baseRoutes from './routes/baseRoutes.js'
import customRoutes from './routes/customRoutes.js'

const router = new MaRouter({
	routes: [...baseRoutes, ...customRoutes],
})

// router.setPushHandler((to, from, next) => {
// 	next();
// })

export default router
