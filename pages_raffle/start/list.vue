<template>
	<view class="start-list">
		<z-paging ref="pagingRef" v-model="dataList" @query="queryList" :default-page-size="15" empty-view-text="暂无获奖记录">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<view class="list">
				<view class="row" v-for="(item,index) in dataList" :key="index">
					<AwardItem :writeOff="true"></AwardItem>
				</view>
			</view>
		</z-paging>
		
		<!-- 右下角扫码核销 -->
		<uni-fab ref="fabRef" :pattern="{icon: 'scan'}" :content="content" horizontal="right" vertical="bottom" @fabClick="scanCode"></uni-fab>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import AwardItem from '@/components/AwardItem.vue';

	const fabRef = ref(null)
	const pagingRef = ref(null)
	const dataList = ref([])

	const queryList = (pageNo,pageSize) => {
		pagingRef.value.complete([])
	}
	const scanCode = () => {
		uni.scanCode({
			success: (res) => {
				console.log(res)
			}
		})
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
