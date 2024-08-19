<template>
	<view class="start-list">
		<z-paging ref="pagingRef" v-model="dataList" @query="queryList" :default-page-size="15" empty-view-text="暂无中奖记录">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<view class="list">
				<view class="row" v-for="(item,index) in dataList" :key="index">
					<AwardItem :code="true"></AwardItem>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import AwardItem from '@/components/AwardItem.vue';

	const pagingRef = ref(null)
	const dataList = ref([])

	const queryList = (pageNo,pageSize) => {
		pagingRef.value.complete([])
	}
</script>

<style lang="scss" scoped>
.start-list {
	.list {
		padding: 30rpx;
		
		.row {
			margin-bottom: 50rpx;
		}
	}
}
</style>
