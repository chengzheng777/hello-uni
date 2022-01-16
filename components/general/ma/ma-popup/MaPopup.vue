<!--
 * @Description: ma-ui - 弹窗
 * @Author: LXG
 * @Date: 2022-01-14
 * @Editors: LXG
 * @LastEditTime: 2022-01-14
-->
<template>
	<view v-if="cpu_inited" class="ma-popup">
		<view
			v-if="showMask"
			class="p-mask"
			:class="{
				'p-mask--enter':transitionInfo.activeStatus==='enter',
				'p-mask--to-enter':transitionInfo.ingStatus==='enter',
				'p-mask--active':transitionInfo.activeStatus==='active',
				'p-mask--to-leave':transitionInfo.ingStatus==='leave',
			}"
			:style="{
				'transition-duration':cpu_duration,
			}"
			@tap.stop="tapMask">
		</view>
		<view
			class="p__body"
			:class="cpu_bodyClass"
			:style="{
				'width':cpu_bodyWidth,
				'height':cpu_bodyHeight,
			}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * @property {Boolean} lazy 是否延迟初始化
	 * @property {Boolean} keepAlive 是否初始化后保持活跃
	 * @property {Number|String} duration 动画时长(秒)
	 * @property {Boolean} showMask 是否显示遮罩层
	 * @property {Boolean} closeOnTapMask 是否在轻触遮罩层时关闭弹窗 
	 * @property {String} direction 弹出方向 -
	 *     center(正中)
	 *     top(顶部)
	 *     right(右侧)
	 *     bottom(底部)
	 *     left(左侧)
	 * @property {String} width 宽度 -
	 *     direction=[center|right|left]时有效
	 * @property {String} height 高度 -
	 *     direction=[center|top|bottom]时有效
	 * @event {Function} open 弹出时
	 * @event {Function} close 关闭时
	 */

	export default {
		name: 'MaPopup',
		components: {},
		filters: {},
		props: {
			lazy: {
				type: Boolean,
				default: true
			},
			keepAlive: {
				type: Boolean,
				default: true
			},
			duration: {
				type: [Number, String],
			},
			showMask: {
				type: Boolean,
				default: true
			},
			closeOnTapMask: {
				type: Boolean,
				default: true
			},
			direction: {
				type: String,
				default: 'center'
			},
			width: {
				type: String,
			},
			height: {
				type: String,
			},
		},
		data() {
			return {
				inited: false,
				in_value: false,
				transitionInfo: {
					/**
					 * 当前的状态
					 *     'enter':进入
					 *     'active': 激活
					 */
					activeStatus: '',
					/**
					 * 进行中的状态
					 *     'enter':进入中
					 *     'leave': 离开中
					 */
					ingStatus: '',
					timer: (() => {
						let timer = null
						return function(fn, delay) {
							timer && clearTimeout(timer)
							timer = setTimeout(() => {
								fn()
							}, delay)
						}
					})()
				},
			};
		},
		computed: {
			cpu_inited({
				inited,
				keepAlive,
				transitionInfo
			}) {
				if (!inited) return false;
				if (keepAlive) return true;
				return !!transitionInfo.activeStatus;
			},
			cpu_duration({
				duration
			}) {
				if (!duration) return '';
				return duration + 's';
			},
			cpu_bodyClass({
				direction,
				transitionInfo
			}) {
				let str = [`p__body--${direction}`]
				transitionInfo.activeStatus && str.push(`p__body--${transitionInfo.activeStatus}`);
				transitionInfo.ingStatus && str.push(`p__body--to-${transitionInfo.ingStatus}`);

				return str.join(' ');
			},
			cpu_bodyWidth({
				direction,
				width
			}) {
				if (['top', 'bottom'].includes(direction)) return '';
				if (['right', 'left'].includes(direction)) return width || '50%';
				return width;
			},
			cpu_bodyHeight({
				direction,
				width,
				height
			}) {
				if (['right', 'left'].includes(direction)) return '';
				if (['top', 'bottom'].includes(direction)) return height || '50%';
				return width;
			},
		},
		methods: {
			/**
			 * @description 切换弹出关闭
			 * @param {Boolean} isOpen 是否打开
			 */
			toggle(isOpen = !this.in_value) {
				this.in_value = isOpen
				isOpen && (this.inited = true);

				const delay = Number(this.duration || 0.2) * 1000
				if (isOpen) {
					this.transitionInfo.activeStatus = 'enter'
					setTimeout(() => {
						this.transitionInfo.ingStatus = 'enter'
						this.transitionInfo.timer(() => {
							this.transitionInfo.ingStatus = ''
							this.transitionInfo.activeStatus = 'active'
						}, delay)
					}, 10)
					this.$emit('open')
				} else {
					this.transitionInfo.ingStatus = 'leave'
					this.transitionInfo.timer(() => {
						this.transitionInfo.ingStatus = ''
						this.transitionInfo.activeStatus = ''
					}, delay)
					this.$emit('close')
				}
			},
			tapMask(e) {
				this.closeOnTapMask && !this.transitionInfo.ingStatus && this.toggle(false);
			},
		},
		watch: {},
		created() {
			this.lazy || (this.inited = true);
		},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-popup.scss";
</style>
