const env = require('./env/index.module.js')
const API_BASE_URL = env.API_BASE_URL

module.exports = {
	devServer: {
		proxy: {
			'/maApi': {
				target: API_BASE_URL,
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/maApi': '',
				},
			},
		}
	}
}
