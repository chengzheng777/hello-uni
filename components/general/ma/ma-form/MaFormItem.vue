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
					<view class="fi-value__inner">
						<slot name="value">
							{{value}}
						</slot>
					</view>
				</view>
			</view>
			<view v-if="showExtra" class="fi-extra">
				<slot name="extra"></slot>
			</view>
		</view>
		<view v-if="showTips" class="fi-tips">
			<slot name="tips">{{tips}}</slot>
		</view>
		<view class="fi-validation"></view>
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
	 * @property {Function} validateMethod 自定义校验函数
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
				default: (val, cb) => {
					// #ifdef MP-WEIXIN
					return function() {
						cb(true)
					}
					// #endif
					cb(true)
				}
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
					this.validateMethod(this.value, (result, msg) => {
						if (!result) {
							this.validationInfo.status = false
							this.validationInfo.msg = msg
							resolve({
								status: false,
								label: this.label,
								msg: msg,
							});
							this.resetValidate()
						}
					})
				})
			},
			/**
			 * @description 重置校验
			 */
			resetValidate() {
				this.validationInfo.status = true
				this.validationInfo.msg = ''
			},
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-form.scss";

	.ma-form-item {
		padding: $form-gap $form-fontSize;
		font-size: $form-fontSize;
	}

	.fi__inner {
		display: flex;
		align-items: center;
	}

	.fi__inner__body {
		flex: 1;
		min-width: 0;
	}

	.fi-label {
		position: relative;
		color: $form-color-label;
		word-break: break-all;
	}

	.fi-label.fi-label--required::before {
		content: "*";
		position: absolute;
		top: 0;
		left: 0;
		display: inline-block;
		color: $form-color-fail;
		transform: translate(-100%, 0);
	}

	.fi-value {
		color: $form-color-value;
		word-break: break-all;
	}

	.fi-value__inner {}

	.fi-value.fi-value--readonly {
		color: $form-color-value-readonly;

		.fi-value__inner {
			display: inline-block;
			text-align: left;
		}
	}

	.fi__inner__body.fi__inner__body--horizontal {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: $form-fontSize;

		.fi-value.fi-value--readonly {
			text-align: right;
		}
	}

	.fi-extra {
		flex-shrink: 0;
		margin-left: $form-gap;
	}

	.fi-tips {
		word-break: break-all;
	}

	.fi-validation {
		word-break: break-all;
	}

	.ma-form-item.form-item--border {
		border: 1px solid $form-color-separator;
		border-radius: $form-borderRadius;
	}

	.ma-form-item.form-item--clickable:active {
		background-color: $form-color-clickable;
	}
</style>
