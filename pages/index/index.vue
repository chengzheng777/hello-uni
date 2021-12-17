<!--
 * @Description: 启动页面
 * @Author: LXG
 * @Date: 2021-12-13
 * @Editors: LXG
 * @LastEditTime: 2021-12-13
-->
<template>
	<view>
		<view>index</view>
		<button type="default" @tap="pushStr">pushStr</button>
		<button type="default" @tap="pushObj">pushObj</button>
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
			pushStr() {
				this.$maRouter.push('/pages/test/test?a=1&b=&c')
			},
			pushObj() {
				this.$maRouter.push({
					name: 'test',
					path: '/pages/test/test?a=1&param=1',
					query: {
						param: 2,
					},
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
