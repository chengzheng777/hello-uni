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
				value="MaFormItem">
			</ma-form-item>
			<MaFormItem
				clickable
				direction="vertical"
				label="MaFormItem"
				value="点击反馈, 垂直布局, 必填, 只读, "
				readonly
				required>
			</MaFormItem>
			<MaFormItem
				label="MaFormItem"
				labelWidth="100rpx"
				readonly
				showTips>
				<template v-slot:value>
					<text>自定义label宽度, 自定义value, 只读, </text>
				</template>
				<template v-slot:tips>
					<text style="color: #999999;">
						(请填写13位手机号码)
					</text>
				</template>
			</MaFormItem>
		</MaForm>
		<button type="default" @tap="handleValidate">表单校验</button>
	</view>
</template>

<script>
	import MaForm from '@/components/general/ma/ma-form/MaForm'
	import MaFormItem from '@/components/general/ma/ma-form/MaFormItem'

	export default {
		components: {
			MaForm,
			MaFormItem,
		},
		filters: {},
		props: {},
		data() {
			return {

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
