<!--
 * @Description: ma-ui - 表格
 * @Author: LXG
 * @Date: 2022-01-16
 * @Editors: LXG
 * @LastEditTime: 2022-01-17
-->
<template>
	<view
		class="ma-table"
		:class="{
			't--border': border,
		}">
		<table class="t-head-table">
			<colgroup>
				<slot name="colgroup">
					<col
						v-for="(col,index) in columns"
						:key="col.prop"
						:style="{
							width:col.width,
						}">
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
		<table class="t-data-table">
			<colgroup>
				<slot name="colgroup">
					<col
						v-for="(col,index) in columns"
						:key="col.prop"
						:style="{
							width:col.width,
						}">
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
				<slot name="append"></slot>
			</tbody>
		</table>
		<view class="t-footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
	import MaTh from './MaTh'
	import MaTd from './MaTd'

	/**
	 * @property {object[]} columns 列数据
	 * @property {object[]} rows 行数据
	 * @property {Boolean} border 是否有边框
	 * @property {Boolean} stripe 表行是否有斑马纹样式
	 */

	export default {
		name: 'MaTable',
		components: {
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
			border: {
				type: Boolean,
				default: true
			},
			stripe: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			};
		},
		computed: {},
		methods: {},
		provide() {
			return {
				tableBorder: () => this.border,
			};
		},
		watch: {},
	}
</script>

<style lang="scss" scoped>
	@import "./ma-table.scss";
</style>
