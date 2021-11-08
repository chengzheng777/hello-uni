<!-- 
 * @Description: 启动空白页
 * 
 * @README
 * 这是app启动后的第一个页面，空白页
 * 可以完成 启动页UI、数据初始化或分发等 任务
 * 例如：未登录时前往登录页；已登录时前往首页
 -->
<template>
	<view class="container">
		<u-button @tap="testGet">测试get请求</u-button>
		<u-button @tap="testPost">测试post请求</u-button>
	</view>
</template>

<script>
	export default {
		methods: {
			testGet() {
				this.$http.get('/dev-api/system/dict/getDictListByType', {
					dictType: 'sq_policy_xmlb',
				}).then(res => {
					console.log(res)
				})
			},
			testPost() {
				this.$http.post('/dev-api/cfgpermitconfig/query/data/find/cfg_permitinfo_andzchx_list', {
					PAGE_CUR: '1',
					PAGE_ROWS: '5',
					itemtype: '2',
					release: '1',
				}).then(res => {
					console.log(res)
				})
			},
		},
		onLoad() {},
	}
</script>

<style>
</style>
