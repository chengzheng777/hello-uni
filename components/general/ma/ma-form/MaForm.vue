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
			getChildrens(target = [], childrenList = []) {
				for (let i = 0; i < childrenList.length; i++) {
					const vc = childrenList[i]
					if (vc.$options.name.match(/^MaForm.+$/)) {
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
					let valids = []
					for (let i = 0; i < childrens.length; i++) {
						childrens[i].validate && valids.push(childrens[i].validate());
					}
					Promise.all(valids).then(res => {
						let fails = res.filter(cv => !cv.status)
						if (fails.length) {
							reject(fails);
							return;
						}
						resolve(true);
					})
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
