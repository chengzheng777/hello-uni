<!--
 * @Description: ma-ui - 表格
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-16
-->
<template>
	<view class="ma-table">
		<table class="t-head-table">
			<colgroup>
				<slot name="colgroup">
					<col
						v-for="(col,index) in columns"
						:key="col.prop">
				</slot>
			</colgroup>
			<thead>
				<slot name="thead">
					<MaTh
						v-for="(headercell,index) in columns"
						:key="headercell.prop">
						{{headercell.label}}
					</MaTh>
				</slot>
			</thead>
		</table>
		<table class="t-body-table">
			<colgroup>
				<slot name="colgroup">
					<col
						v-for="(col,index) in columns"
						:key="col.prop">
				</slot>
			</colgroup>
			<tbody>
				<slot>
					<tr
						v-for="(row,rIndex) in rows"
						:key="row.rowIndex">
						<MaTd
							v-for="(datacell,dIndex) in columns"
							:key="datacell.prop">
							{{row[datacell.prop]}}
						</MaTd>
					</tr>
				</slot>
			</tbody>
		</table>
		<view class="t-footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
	import MaTr from './MaTr'
	import MaTh from './MaTh'
	import MaTd from './MaTd'

	/**
	 * @property {object[]} columns 列数据
	 * @property {object[]} rows 行数据
	 */

	export default {
		name: 'MaTable',
		components: {
			MaTr,
			MaTh,
			MaTd,
		},
		filters: {},
		props: {
			columns: {
				type: Array,
				default: () => []
			},
			rows: {
				type: Array,
				default: () => []
			},
		},
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
