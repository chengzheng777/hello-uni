<!--
 * @Description: ma-ui - 字体图标
 * @Author: LXG
 * @Date: 2021-12-14
 * @Editors: LXG
 * @LastEditTime: 2022-01-26
-->
<template>
	<i
		class="ma-icon"
		:class="[
			cpu_familyName,
			name,
		]">
	</i>
</template>

<script>
	/**
	 * @property {String} name 图标名
	 */

	export default {
		name: 'MaIcon',
		components: {},
		filters: {},
		props: {
			name: {
				type: String,
				default: ''
			},
		},
		data() {
			return {

			};
		},
		computed: {
			cpu_familyName({
				name
			}) {
				if (!name) return '';
				return name.split('-')[0];
			},
		},
		methods: {},
		watch: {},
	}
</script>

<style lang="scss" scoped>
</style>
