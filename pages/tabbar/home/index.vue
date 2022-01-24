<!--
 * @Description: tabbar - 首页
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-01-10
-->
<template>
	<view>
		<view>home</view>
		<button type="default" @tap="pushObj">maRouter.push(obj)</button>
		<button type="default" @tap="pushTab">maRouter.push(tab)</button>
		<button type="default" @tap="replace">maRouter.replace</button>
		<button type="default" @tap="relaunch">maRouter.relaunch</button>
	</view>
</template>

<script>
	export default {
		components: {},
		filters: {},
		props: {},
		data() {
			return {

			};
		},
		computed: {},
		methods: {
			pushObj() {
				this.$maRouter.push({
					path: '/pages/control/index?a=1&b=1',
					query: {
						b: '2',
						c: '3',
					},
				})
			},
			pushTab() {
				this.$maRouter.push({
					name: 'mine',
				})
			},
			replace() {
				this.$maRouter.replace({
					name: 'control',
				})
			},
			relaunch() {
				this.$maRouter.relaunch({
					name: 'control',
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
