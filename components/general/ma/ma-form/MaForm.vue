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
			},
			separator: {
				type: Boolean,
				default: false
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
			 * @param {VueComponent[]} childrenList 子组件实例列表
			 * @returns {VueComponent[]}
			 */
			getChildrens(target = [], childrenList = []) {
				for (let i = 0; i < childrenList.length; i++) {
					const vc = childrenList[i]
					if (vc.$el && vc.$el.classList.contains('ma-form-item')) {
						target.push(vc)
						continue;
					}
					if (vc.$options.name === 'MaFormItem') {
						target.push(vc)
						continue;
					}
					if (vc.$children.length) {
						this.getChildrens(target, vc.$children);
					}
				}
				return target;
			},
			/**
			 * @description 校验
			 */
			validate() {
				return new Promise((resolve, reject) => {
					let childrens = this.getChildrens([], this.$children)
					console.log(childrens)
				})
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
