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
			<ma-form-item
				label="MaFormItem"
				value="MaFormItem"
				readonly>
			</ma-form-item>
			<MaFormInput
				label="MaFormInput"
				v-model="inputData"
				required>
			</MaFormInput>
		</MaForm>
		<button type="default" @tap="handleValidate">表单校验</button>
	</view>
</template>

<script>
	import MaForm from '@/components/general/ma/ma-form/MaForm'
	import MaFormItem from '@/components/general/ma/ma-form/MaFormItem'
	import MaFormInput from '@/components/general/ma/ma-form-input/MaFormInput'

	export default {
		components: {
			MaForm,
			MaFormItem,
			MaFormInput,
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
		},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
</style>
