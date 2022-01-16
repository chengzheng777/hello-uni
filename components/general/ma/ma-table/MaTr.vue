<!--
 * @Description: ma-ui - 表格行
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-16
-->
<template>
	<tr class="ma-tr">
		<slot></slot>
	</tr>
</template>

<script>
	export default {
		name: 'MaTr',
		components: {},
		filters: {},
		props: {},
		data() {
			return {

			};
		},
		computed: {},
		methods: {},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-table.scss";
</style>
