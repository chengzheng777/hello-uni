<script>
	export default {
		onLaunch: function(options) {
			console.log('App Launch', options)
			this.$maRouter.guardHandler({
				path: '/' + options.path,
			}, {
				path: '/',
			}, () => {})
		},
		onShow: function(options) {
			// console.log('App Show', options)
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./static/iconfont/mam/iconfont.css";
	@import "./static/iconfont/mas/iconfont.css";
	@import "./components/general/ma/ma.scss";
	@import "./common/css/global.scss";
</style>
