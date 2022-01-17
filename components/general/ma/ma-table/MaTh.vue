<!--
 * @Description: ma-ui - 表格头部单元格
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-16
-->
<template>
	<th
		class="ma-th"
		:class="{
			't--border':cpu_border,
		}">
		<slot></slot>
	</th>
</template>

<script>
	export default {
		name: 'MaTh',
		components: {},
		filters: {},
		inject: {
			tableBorder: {
				from: 'tableBorder',
				default: () => {
					return function() {
						return true;
					}
				}
			},
		},
		props: {},
		data() {
			return {

			};
		},
		computed: {
			cpu_border() {
				return this.tableBorder();
			},
		},
		methods: {},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-th.scss";
</style>
