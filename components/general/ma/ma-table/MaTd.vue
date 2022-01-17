<!--
 * @Description: ma-ui - 表格数据单元格
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-16
-->
<template>
	<td
		class="ma-td"
		:class="{
			't--border':cpu_border,
		}">
		<slot></slot>
	</td>
</template>

<script>
	export default {
		name: 'MaTd',
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
	@import "./ma-td.scss";
</style>
