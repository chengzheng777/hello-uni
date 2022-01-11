<!--
 * @Description: 启动页面
 * @Author: LXG
 * @Date: 2021-12-13
 * @Editors: LXG
 * @LastEditTime: 2022-01-05
-->
<template>
	<view>
		<view>index</view>
		<button type="default" @tap="goHome">进入首页</button>
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
			goHome() {
				uni.switchTab({
					url: '/pages/tabbar/home/index',
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
