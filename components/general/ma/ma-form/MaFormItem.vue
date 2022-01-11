<!--
 * @Description: ma-ui - 表单项
 * @Author: LXG
 * @Date: 2022-01-11
 * @Editors: LXG
 * @LastEditTime: 2022-01-11
-->
<template>
	<view
		class="ma-form-item"
		:class="{
			'form-item--border': border,
			'form-item--clickable': clickable,
			'form-item--vertical': direction==='vertical',
		}">
		<view class="fi__inner">
			<view v-if="showLabel" class="fi-label">
				<slot name="label">
					<label>{{label}}</label>
				</slot>
			</view>
			<view class="fi-value">
				<slot name="value">
					{{label}}
				</slot>
			</view>
			<view v-if="showExtra" class="fi-extra">
				<slot name="extra"></slot>
			</view>
		</view>
		<view class="fi-tips">
			<slot name="tips">{{tips}}</slot>
		</view>
		<view class="fi-validation"></view>
	</view>
</template>

<script>
	/**
	 * @property {Boolean} border 是否有边框
	 * @property {Boolean} clickable 点击反馈
	 * @property {String} direction 内部布局方向
	 * 	@value horizontal 水平
	 * 	@value vertical 垂直
	 * @property {Boolean} showLabel 是否显示左(上)侧label
	 * @property {String} label 左(上)侧label
	 * @property {*} value value
	 * @property {Boolean} required 是否必填
	 * @property {Boolean} showExtra 是否显示右侧extra
	 * @property {String} tips 底部小贴士
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
						return 'auto';
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
			label: {
				type: String,
			},
			value: {},
			required: {
				type: Boolean,
				default: false
			},
			showExtra: {
				type: Boolean,
				default: false
			},
			tips: {
				type: String,
			},
		},
		data() {
			return {

			};
		},
		computed: {},
		methods: {},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-form.scss";
</style>
