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
				stripe>
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
	import MaTh from '@/components/general/ma/ma-table/MaTh'
	import MaTd from '@/components/general/ma/ma-table/MaTd'

	export default {
		components: {
			MaForm,
			MaFormItem,
			MaFormInput,
			MaPopup,
			MaTable,
			MaTh,
			MaTd,
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
							width: '112rpx',
						},
						{
							prop: 'name',
							label: '姓名',
							width: '140rpx',
						},
						{
							prop: 'sex',
							label: '性别',
						},
					],
					rows: [{
							index: '1',
							name: '林晓刚',
							sex: '男',
						},
						{
							index: '2',
							name: '程政',
							sex: '女',
						},
						{
							index: '3',
							name: '王光涛',
							sex: '女',
						},
						{
							index: '4',
							name: '万兴兴',
							sex: '男',
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
		},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
</style>
