<!--
 * @Description: tabbar - 首页
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-01-25
-->
<template>
	<view>
		<view>home</view>
	</view>
</template>

<script>
	import {
		format
	} from '@/utils/date-handler.js'

	export default {
		components: {},
		filters: {},
		props: {},
		data() {
			return {

			};
		},
		computed: {},
		methods: {},
		watch: {},
		onLoad(options) {},
		onReady() {
			console.log(format())
			console.log(format(new Date()))
			console.log(format('2022-01-26', 'datetime'))
			console.log(format('2022-01-26 20:07:0', 'date'))
			console.log(format('2022-01-26T20:07:39.639+0800', 'time'))
			console.log(format(1643198859000))
			console.log(format(new Date(), 'hello, %MM%/%DD%/%YYYY%'))
			console.log(format('abc'))
		},
	}
</script>

<style lang="scss" scoped>
</style>
