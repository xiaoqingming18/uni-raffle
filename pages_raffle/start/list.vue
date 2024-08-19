<template>
	<view class="start-list">
		<!-- <z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="15">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<view class="list">
				<view class="row">
					<AwardItem></AwardItem>
				</view>
			</view>
		</z-paging> -->
		<view class="list">
			<view class="row">
				<AwardItem></AwardItem>
			</view>
		</view>
	</view>
</template>

<script setup>
	import AwardItem from '@/components/AwardItem.vue';
</script>

<style lang="scss" scoped>

</style>
