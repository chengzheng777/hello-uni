<!--
 * @Description: tabbar - 我的
 * @Author: LXG
 * @Date: 2022-01-10
 * @Editors: LXG
 * @LastEditTime: 2022-01-10
-->
<template>
	<view>
		<view>mine</view>
		<MaForm>
			<MaFormItem label="测试新的表单项" value="MaFormItem"></MaFormItem>
		</MaForm>
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
		methods: {},
		watch: {},
		onLoad(options) {},
		onReady() {},
	}
</script>

<style lang="scss" scoped>
</style>
