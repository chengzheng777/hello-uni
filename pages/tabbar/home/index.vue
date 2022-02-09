<!--
 * @Description: tabbar - 首页
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-02-07
-->
<template>
	<view>
		<view>home</view>
	</view>
</template>

<script>
	import {
		encrypt
	} from '@/utils/crypto-js/aes-handler.js'

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
			encrypt('我是一只猪', 'tykycyzj20210601')
		},
	}
</script>

<style lang="scss" scoped>
</style>
