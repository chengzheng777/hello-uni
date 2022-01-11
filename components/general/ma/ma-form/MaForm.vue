<!--
 * @Description: ma-ui组件 - 表单
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-01-10
-->
<template>
	<view
		class="ma-form"
		:class="{
			'form--hs': separator,
		}">
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * @property {String} labelWidth label宽度
	 * @property {Boolean} separator 子元素表单项之间是否有分隔线
	 */

	export default {
		name: 'MaForm',
		components: {},
		filters: {},
		props: {
			labelWidth: {
				type: String,
				default: 'auto'
			},
			separator: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {

			};
		},
		computed: {},
		methods: {
			/**
			 * @description 获取内部表单项对象
			 */
			getChildrens() {
				// #ifdef MP-WEIXIN
				return this.$children[0];
				// #endif
				return this.$children[0].$children;
			},
		},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-form.scss";
</style>
