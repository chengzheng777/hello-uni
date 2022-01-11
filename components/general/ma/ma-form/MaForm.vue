<!--
 * @Description: ma-ui - 表单
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-01-10
-->
<template>
	<form
		class="ma-form"
		:class="{
			'form--hs': separator,
		}">
		<slot></slot>
	</form>
</template>

<script>
	/**
	 * @property {Object} formData 表单数据
	 * @property {String} labelWidth label宽度
	 * @property {Boolean} separator 子元素表单项之间是否有分隔线
	 */

	export default {
		name: 'MaForm',
		components: {},
		filters: {},
		props: {
			formData: {
				type: Object,
				default: () => {
					return {};
				}
			},
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
			 * @description 获取内部的表单项组件实例
			 */
			getChildrens() {
				// #ifdef MP-WEIXIN
				return this.$children[0];
				// #endif
				return this.$children[0].$children;
			},
		},
		provide() {
			return {
				formLabelWidth: () => this.labelWidth,
			};
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-form.scss";
</style>
