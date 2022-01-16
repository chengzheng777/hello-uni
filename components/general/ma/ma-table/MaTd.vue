<!--
 * @Description: ma-ui - 表格数据单元格
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-16
-->
<template>
	<td class="ma-td">
		<slot></slot>
	</td>
</template>

<script>
	export default {
		name: 'MaTd',
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
