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
import tabRoutes from './routes/tabRoutes.js'

const router = new MaRouter({
	routes: [...baseRoutes, ...customRoutes, ...tabRoutes],
})

// router.setGuard((to, from, next) => {
// 	// console.log(to, from)
// 	next();
// })

export default router
