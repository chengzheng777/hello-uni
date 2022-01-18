<!--
 * @Description: tabbar - 我的
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-01-10
-->
<template>
	<view>
		<MaForm ref="maForm" separator>
			<MaFormItem
				label="MaFormItem"
				value="MaFormItem"
				readonly>
			</MaFormItem>
			<MaFormInput
				label="MaFormInput"
				v-model="inputData"
				required>
			</MaFormInput>
		</MaForm>
		<button type="default" @tap="handleValidate">表单校验</button>
		<MaPopup
			ref="maPopup"
			direction="bottom">
			<view>abcdefg</view>
		</MaPopup>
		<button type="default" @tap="handlePopup">弹窗切换</button>
		<view class="pad-2">
			<MaTable
				:columns="tableData.columns"
				:rows="tableData.rows"
				stripe
				@rowTap="handleRow"
				@datacellTap="handleDatacell">
				<tr 
					v-for="(row,index) in tableData.rows"
					:key="index"
					class="ma-tr">
					<td class="ma-td">{{row.index}}</td>
					<td class="ma-td">{{row.name}}</td>
					<td class="ma-td">{{row.sex}}</td>
					<td class="ma-td">{{row.beGoodAt}}</td>
				</tr>
			</MaTable>
		</view>
	</view>
</template>

<script>
	import MaForm from '@/components/general/ma/ma-form/MaForm'
	import MaFormItem from '@/components/general/ma/ma-form/MaFormItem'
	import MaFormInput from '@/components/general/ma/ma-form-input/MaFormInput'
	import MaPopup from '@/components/general/ma/ma-popup/MaPopup'
	import MaTable from '@/components/general/ma/ma-table/MaTable'

	export default {
		components: {
			MaForm,
			MaFormItem,
			MaFormInput,
			MaPopup,
			MaTable,
		},
		filters: {},
		props: {},
		data() {
			return {
				inputData: '',
				tableData: {
					columns: [{
							prop: 'index',
							label: '序号',
							headercellClass: 'col-red',
						},
						{
							prop: 'name',
							label: '姓名',
							datacellClass: 'col-theme',
							clickable: true,
						},
						{
							prop: 'sex',
							label: '性别',
						},
						{
							prop: 'beGoodAt',
							label: '特长',
						},
					],
					rows: [{
							index: '1',
							name: '林晓刚',
							sex: '男',
							beGoodAt: '睡觉',
						},
						{
							index: '2',
							name: '万兴兴',
							sex: '男',
							beGoodAt: '直播',
						},
						{
							index: '3',
							name: '刘奔宇',
							sex: '男',
							beGoodAt: '宇神',
						},
						{
							index: '4',
							name: '陈奎全',
							sex: '男',
							beGoodAt: '???',
						},
						{
							index: '5',
							name: '王光涛',
							sex: '男',
							beGoodAt: '六边形战士',
						},
						{
							index: '6',
							name: '程政',
							sex: '男',
							beGoodAt: '六边形战士',
						},
						{
							index: '7',
							name: '甘锦富',
							sex: '男',
							beGoodAt: 'English',
						},
						{
							index: '8',
							name: '涂丽芳',
							sex: '女',
							beGoodAt: '???',
						},
					],
				},
			};
		},
		computed: {},
		methods: {
			handleValidate() {
				this.$refs['maForm'].validate().then(res => {
					console.warn(res)
				}).catch(err => {
					console.warn(err)
				})
			},
			handlePopup() {
				this.$refs['maPopup'].toggle()
			},
			handleRow({
				row,
				index
			}, e) {
				console.log('handleRow', row, index, e)
			},
			handleDatacell({
				row,
				column,
				rIndex,
				cIndex
			}, e) {
				console.log('handleDatacell', row, column, rIndex, cIndex, e)
			},
		},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
</style>
