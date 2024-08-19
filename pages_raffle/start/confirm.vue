<template>
	<view class="confirm">
		<view class="row">
			<AwardItem :confirm="true"></AwardItem>
		</view>
	</view>
</template>

<script setup>
	import AwardItem from '@/components/AwardItem.vue';
</script>

<style lang="scss" scoped>
	.confirm {
		padding: 30rpx;
	}
</style>
