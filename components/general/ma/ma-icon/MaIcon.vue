<!--
 * @Description: ma-ui组件 - 字体图标
 * @Author: LXG
 * @Date: 2021-12-14
 * @Editors: LXG
 * @LastEditTime: 2021-12-14
-->
<template>
	<i
		class="ma-icon"
		:class="[
			cpu_familyName,
			name,
			cpu_colorClass,
		]">
	</i>
</template>

<script>
	export default {
		name: 'MaIcon',
		components: {},
		filters: {},
		props: {
			// 族名-图标名(mas-star)
			name: {
				type: String,
				default: ''
			},
			// 默认配色
			color: {
				type: String,
				default: ''
			},
		},
		data() {
			return {

			};
		},
		computed: {
			/**
			 * @description 字体图标族名
			 * @returns {string}
			 */
			cpu_familyName({
				name
			}) {
				if (!name) return '';
				return name.split('-')[0];
			},
			/**
			 * @description 默认配色样式类
			 * @returns {string}
			 */
			cpu_colorClass({
				color
			}) {
				if (!color) return '';
				return 'icon--' + color;
			},
		},
		methods: {},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	$colorTheme: $col-theme;
	$colorBlue: $col-blue;
	$colorGreen: $col-green;
	$colorRed: $col-red;
	$colorYellow: $col-yellow;

	.ma-icon {
		&.icon--black {
			color: #000000;
		}

		&.icon--white {
			color: #ffffff;
		}

		&.icon--theme {
			color: $colorTheme;
		}

		&.icon--blue {
			color: $colorBlue;
		}

		&.icon--green {
			color: $colorGreen;
		}

		&.icon--red {
			color: $colorRed;
		}

		&.icon--yellow {
			color: $colorYellow;
		}
	}
</style>
