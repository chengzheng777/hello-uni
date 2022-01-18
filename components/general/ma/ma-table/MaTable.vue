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
			't--scroll':height||maxHeight,
			't--border': border,
		}"
		:style="{
			'height':height,
			'max-height':maxHeight,
			'text-align':textAlign,
		}">
		<table
			class="t-head-table"
			:class="{
				't-head-table--sticky':height||maxHeight,
			}">
			<colgroup>
				<col
					v-for="(col,index) in columns"
					:key="col.prop"
					:style="{
						width:col.width||'',
					}">
			</colgroup>
			<thead>
				<slot name="thead">
					<th
						v-for="(headercell,index) in columns"
						:key="headercell.prop"
						class="ma-th"
						:class="headercell.headercellClass">
						{{headercell.label}}
					</th>
				</slot>
			</thead>
		</table>
		<table
			class="t-data-table"
			:class="{
				't-data-table--stripe':stripe,
			}">
			<colgroup>
				<col
					v-for="(col,index) in columns"
					:key="col.prop"
					:style="{
							width:col.width,
						}">
			</colgroup>
			<tbody>
				<slot>
					<tr
						v-for="(row,rIndex) in rows"
						:key="rIndex"
						class="ma-tr"
						@tap="rowTap(row,rIndex,$event)">
						<td
							v-for="(datacell,cIndex) in columns"
							:key="datacell.prop"
							class="ma-td"
							:class="datacell.datacellClass"
							@tap.stop="datacellTap(row,datacell,rIndex,cIndex,$event)">
							{{row[datacell.prop]}}
						</td>
					</tr>
				</slot>
				<slot name="append"></slot>
			</tbody>
		</table>
		<view v-if="showFooter" class="t-footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * @property {object[]} columns 列数据 -
	 *     .prop(属性名)
	 *     .label(表头标签文本)
	 *     .width(宽度)
	 *     .headercellClass(表头单元格样式类名)
	 *     .datacellClass(表体单元格样式类名)
	 *     .clickable(轻触反馈，用于阻止冒泡)(仅非自定义有效)
	 * @property {object[]} rows 行数据
	 * @property {String} height 高度(开启滚动)
	 * @property {String} maxHeight 最大高度(开启滚动)
	 * @property {Boolean} border 是否有边框样式
	 * @property {Boolean} stripe 表体行是否有斑马纹样式
	 * @property {String} textAlign 单元格文本水平对齐方式 -
	 *     left(居左)
	 *     center(居中)
	 *     right(居右)
	 * @property {Boolean} showFooter 显示表脚
	 * @event {Function} rowTap 轻触表体行时(仅非自定义有效)({row,rIndex},e) -
	 *     row: 当前行数据,
	 *     rIndex: 当前行下标,
	 *     e: Event,
	 * @event {Function} datacellTap 轻触表体单元格时(仅非自定义有效)({row,column,rIndex,cIndex},e) -
	 *     row: 当前行数据,
	 *     column: 当前列数据,
	 *     rIndex: 当前行下标,
	 *     cIndex: 当前列下标,
	 *     e: Event,
	 */

	export default {
		name: 'MaTable',
		components: {},
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
			height: {
				type: String,
			},
			maxHeight: {
				type: String,
			},
			border: {
				type: Boolean,
				default: true
			},
			stripe: {
				type: Boolean,
				default: false
			},
			textAlign: {
				type: String,
			},
			showFooter: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			};
		},
		computed: {},
		methods: {
			rowTap(row, index, e) {
				this.$emit('rowTap', {
					row,
					index
				}, e)
			},
			datacellTap(row, column, rIndex, cIndex, e) {
				if (!column.clickable) {
					this.rowTap(row, rIndex, e)
					return;
				}
				this.$emit('datacellTap', {
					row,
					column,
					rIndex,
					cIndex
				}, e)
			},
		},
		provide() {
			return {
				tableBorder: () => this.border,
			};
		},
		watch: {},
	}
</script>

<style lang="scss">
	@import "./ma-table.scss";
</style>
