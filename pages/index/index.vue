<!--
 * @Description: 启动页面
 * @Author: LXG
 * @Date: 2021-12-13
 * @Editors: LXG
 * @LastEditTime: 2022-01-21
-->
<template>
	<view class="index">
		<image
			class="logo"
			src="~@/static/images/general/logo/ma.png"
			mode="aspectFit"
			@tap="goHome">
		</image>
	</view>
</template>

<script>
	export default {
		name: 'Index',
		components: {},
		filters: {},
		props: {},
		data() {
			return {

			};
		},
		computed: {},
		methods: {
			goHome() {
				this.$maRouter.switchTab({
					name: 'home',
				})
			},
		},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
	.index {
		display: grid;
		place-items: center;
		height: calc(100vh - var(--window-top) - var(--window-bottom));
	}

	.logo {
		width: 360px;
		height: 360px;
		transform: translateY(0);
		animation-name: suspending;
		animation-duration: 1s;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
	}

	@keyframes suspending {
		0% {
			transform: translateY(0);
			animation-timing-function: ease-out;
		}

		45% {
			transform: translateY(-10px);
			animation-timing-function: ease-out;
		}

		55% {
			transform: translateY(-10px);
			animation-timing-function: ease-in;
		}

		100% {
			transform: translateY(0);
			animation-timing-function: ease-in;
		}
	}
</style>
