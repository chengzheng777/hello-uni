<!--
 * @Description: ma-ui - 表单项 - 文本输入框
 * @Author: LXG
 * @Date: 2022-01-13
 * @Editors: LXG
 * @LastEditTime: 2022-01-13
-->
<template>
	<MaFormItem
		ref="formItem"
		class="ma-form-input"
		:border="border"
		:direction="direction"
		:showLabel="showLabel"
		:label="label"
		:labelWidth="labelWidth"
		:readonly="readonly"
		:required="required"
		:showExtra="showExtra"
		:showTips="showTips"
		:tips="tips">
		<template v-slot:label>
			<slot name="label">
				<label>{{label}}</label>
			</slot>
		</template>
		<template>
			<view
				v-if="readonly"
				class="fi-value__inner">
				{{cpu_value}}
			</view>
			<input
				v-else
				class="fi-value-input"
				v-model="cpu_value"
				:type="type"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxlength"
				@input="input"
				@blur="blur"
				@confirm="confirm" />
		</template>
		<template v-slot:extra>
			<slot name="extra"></slot>
		</template>
		<template v-slot:tips>
			<slot name="tips">{{tips}}</slot>
		</template>
		<template v-slot:append>
			<slot name="append"></slot>
		</template>
	</MaFormItem>
</template>

<script>
	import MaFormItem from '../ma-form/MaFormItem'

	/**
	 * @property {Boolean} border 是否有边框
	 * @property {String} direction 内部布局方向 -
	 *     horizontal(水平)
	 *     vertical(垂直)
	 * @property {Boolean} showLabel 是否显示左(上)侧label
	 * @property {String} label 左(上)侧label
	 * @property {String} labelWidth 左(上)侧label宽度
	 * @property {String} value value
	 * @property {Boolean} readonly 是否只读 -
	 *     只读状态下，value右对齐(仅水平布局)，且字体色号采用只读色
	 * @property {Boolean} required 是否必填
	 * @property {Boolean} showExtra 是否显示右侧extra
	 * @property {Boolean} showTips 显示底部小贴士
	 * @property {String} tips 底部小贴士
	 * @property {Function} validateMethod 自定义校验函数
	 * 
	 * @property {String} type input的类型
	 * @property {String} placeholder input的占位文本
	 * @property {Boolean} disabled 是否禁用
	 * @property {Number} maxlength 最大输入长度
	 */

	export default {
		name: 'MaFormInput',
		components: {
			MaFormItem,
		},
		filters: {},
		props: {
			border: {
				type: Boolean,
				default: false
			},
			direction: {
				type: String,
				default: 'horizontal'
			},
			showLabel: {
				type: Boolean,
				default: true
			},
			label: {
				type: String,
			},
			labelWidth: {
				type: String,
			},
			value: {
				type: String,
			},
			readonly: {
				type: Boolean,
				default: false
			},
			required: {
				type: Boolean,
				default: false
			},
			showExtra: {
				type: Boolean,
				default: false
			},
			showTips: {
				type: Boolean,
				default: false
			},
			tips: {
				type: String,
			},
			validateMethod: {
				type: Function,
				// #ifdef H5
				default: (val, cb) => {
					cb(true)
				},
				// #endif
				// #ifndef H5
				default: () => {
					return function(val, cb) {
						cb(true)
					}
				}
				// #endif
			},
			// --------------------------------------------------
			type: {
				type: String,
				default: 'text'
			},
			placeholder: {
				type: String,
				default: '请输入'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number, String],
				default: 32
			},
		},
		data() {
			return {
				in_value: '',
			};
		},
		computed: {
			cpu_value: {
				get() {
					return this.value ?? this.in_value;
				},
				set(val) {
					this.in_value = val
					this.$emit('input', val)
				}
			},
		},
		methods: {
			input(e) {
				this.$nextTick(() => {
					this.validate()
				})
			},
			blur(e) {
				this.$emit('blur', e)
			},
			confirm(e) {
				this.$emit('confirm', e)
			},
			/**
			 * @description 校验
			 */
			validate() {
				return new Promise((resolve, reject) => {
					if (this.required) {
						if ((this.cpu_value ?? '') === '') {
							let obj = {
								status: false,
								msg: '请输入',
							}
							this.$refs['formItem'].setValidation(obj)
							resolve({
								...obj,
								label: this.label,
							});
							return;
						}
					}
					this.validateMethod(this.cpu_value, (res, msg) => {
						if (!res) {
							let obj = {
								status: false,
								msg: msg,
							}
							this.$refs['formItem'].setValidation(obj)
							resolve({
								...obj,
								label: this.label,
							});
							return;
						}
						this.$refs['formItem'].setValidation()
						resolve({
							status: true,
						});
					})
				})
			},
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-form-input.scss";
</style>
