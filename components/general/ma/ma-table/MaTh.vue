<!--
 * @Description: ma-ui - 表格头部单元格
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-16
-->
<template>
	<th class="ma-th">
		<slot></slot>
	</th>
</template>

<script>
	export default {
		name: 'MaTh',
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
