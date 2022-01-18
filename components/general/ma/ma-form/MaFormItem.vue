<!--
 * @Description: ma-ui - 表单项
 * @Author: LXG
 * @Date: 2022-01-11
 * @Editors: LXG
 * @LastEditTime: 2022-01-12
-->
<template>
	<view
		class="ma-form-item"
		:class="{
			'form-item--border':border,
			'form-item--clickable':clickable,
		}">
		<view class="fi__inner" @tap="handleClick">
			<view
				class="fi__inner__body"
				:class="{
					'fi__inner__body--horizontal':direction==='horizontal',
				}">
				<view
					v-if="showLabel"
					class="fi-label"
					:class="{
						'fi-label--required':required,
					}"
					:style="{
						'width':cpu_labelWidth,
					}">
					<slot name="label">
						<label>{{label}}</label>
					</slot>
				</view>
				<view
					class="fi-value"
					:class="{
						'fi-value--readonly':readonly,
					}">
					<slot>
						<view class="fi-value__inner">
							{{value}}
						</view>
					</slot>
				</view>
			</view>
			<view v-if="showExtra" class="fi-extra">
				<slot name="extra"></slot>
			</view>
		</view>
		<view v-if="showTips" class="fi-tips">
			<slot name="tips">{{tips}}</slot>
		</view>
		<view
			v-if="!validationInfo.status"
			class="fi-validation">
			{{validationInfo.msg}}
		</view>
		<slot name="append"></slot>
	</view>
</template>

<script>
	/**
	 * @property {Boolean} border 是否有边框
	 * @property {Boolean} clickable 点击反馈
	 * @property {String} direction 内部布局方向 -
	 *     horizontal(水平)
	 *     vertical(垂直)
	 * @property {Boolean} showLabel 是否显示左(上)侧label
	 * @property {String} label 左(上)侧label
	 * @property {String} labelWidth 左(上)侧label宽度
	 * @property {Any} value value
	 * @property {Boolean} readonly 是否只读 -
	 *     只读状态下，value右对齐(仅水平布局)，且字体色号采用只读色
	 * @property {Boolean} required 是否必填
	 * @property {Boolean} showExtra 是否显示右侧extra
	 * @property {Boolean} showTips 显示底部小贴士
	 * @property {String} tips 底部小贴士
	 * @property {function} validateMethod 自定义校验函数(val,cb) -
	 *     val: 值,
	 *     cb: 回调函数,
	 * @event {Function} handleClick 轻触时(e) -
	 *     e: Event,
	 */

	export default {
		name: 'MaFormItem',
		components: {},
		filters: {},
		inject: {
			formLabelWidth: {
				from: 'formLabelWidth',
				default: () => {
					return function() {
						return;
					}
				}
			},
		},
		props: {
			border: {
				type: Boolean,
				default: false
			},
			clickable: {
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
			value: {},
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
		},
		data() {
			return {
				// 校验信息
				validationInfo: {
					status: true, // 校验是否通过
					msg: '', // 校验不通过的提示文本
				},
			};
		},
		computed: {
			cpu_labelWidth({
				labelWidth,
				formLabelWidth
			}) {
				return labelWidth || formLabelWidth() || undefined;
			},
		},
		methods: {
			handleClick(e) {
				this.clickable && this.$emit('handleClick', e)
			},
			/**
			 * @description 校验
			 */
			validate() {
				return new Promise((resolve, reject) => {
					this.validateMethod(this.value, (res, msg) => {
						if (!res) {
							let obj = {
								status: false,
								msg: msg,
							}
							this.setValidation(obj)
							resolve({
								...obj,
								label: this.label,
							});
							return;
						}
						this.setValidation()
						resolve({
							status: true,
						});
					})
				})
			},
			/**
			 * @description 设置校验信息
			 * @param {object} info 校验信息
			 */
			setValidation(info = {}) {
				this.validationInfo.status = info.status ?? true
				this.validationInfo.msg = info.msg ?? ''
			},
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-form-item.scss";
</style>
