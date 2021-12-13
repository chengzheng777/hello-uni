<!--
 * @Description: 启动页面
 * @Author: LXG
 * @Date: 2021-12-13
 * @Editors: LXG
 * @LastEditTime: 2021-12-13
-->
<template>
	<view>
		<button type="default" @tap="sendHttp">请求</button>
	</view>
</template>

<script>
	export default {
		name: 'Index',
		components: {},
		filters: {},
		props: {},
		data() {
			return {

			};
		},
		computed: {},
		methods: {
			sendHttp() {
				this.$http.post('/dev-api/cfgpermitconfig/query/data/find/cfg_permitinfo_andzchx_list', {
					data: {},
				}).then(res => {
					console.log('请求成功:', res)
				}).catch(err => {
					console.error('请求失败:', err)
				})
			},
		},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
</style>
