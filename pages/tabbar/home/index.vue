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
		<button type="default" @tap="httpGet">maHttper get</button>
		<button type="default" @tap="pushStr">maRouter push(str)</button>
		<button type="default" @tap="pushObj">maRouter push(obj)</button>
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
			httpGet() {
				this.$maHttper.get('/dev-api/system/dict/getDictListByType', {
					dictType: 'sq_policy_zjlx',
				}).then(res => {
					console.log(res)
				})
			},
			pushStr() {
				this.$maRouter.push('/pages/test/test?a=1&b=&c')
			},
			pushObj() {
				this.$maRouter.push({
					name: 'test',
					path: '/pages/test/test?a=1&param=1',
					query: {
						param: '2',
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
