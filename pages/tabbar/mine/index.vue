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
		<MaPopup
			ref="maPopup"
			direction="bottom">
			<view>abcdefg</view>
		</MaPopup>
		<button type="default" @tap="handleValidate">表单校验</button>
		<button type="default" @tap="handlePopup">弹窗切换</button>
	</view>
</template>

<script>
	import MaForm from '@/components/general/ma/ma-form/MaForm'
	import MaFormItem from '@/components/general/ma/ma-form/MaFormItem'
	import MaFormInput from '@/components/general/ma/ma-form-input/MaFormInput'
	import MaPopup from '@/components/general/ma/ma-popup/MaPopup'

	export default {
		components: {
			MaForm,
			MaFormItem,
			MaFormInput,
			MaPopup,
		},
		filters: {},
		props: {},
		data() {
			return {
				inputData: '文本输入框',
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
