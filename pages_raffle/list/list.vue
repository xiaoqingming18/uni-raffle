<template>
	<view class="raffle-list">
		<z-paging ref="pagingRef" v-model="dataList" @query="queryList">
			<template #loading>
				<uni-load-more status="loading" />
			</template>
			<uni-list border v-if="dataList.length">
				<uni-list-item v-for="item in dataList" :key="item.id" :title="item.title" :note="`列表描述信息\n已参与10人`" showArrow clickable @click="routerTo('/pages_raffle/detail/detail')"></uni-list-item>
			</uni-list>
		</z-paging>
		
		<uni-fab
			:pattern="{icon: 'plusempty'}"
			content="content"
			horizontal="right"
			vertical="bottom"
			@fabClick="handleAddRaffle"
		></uni-fab>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {routerTo} from '@/utils/common.js'
	
	const pagingRef = ref(null)
	const dataList = ref([])
	
	// 跳转新增抽奖页面
	const handleAddRaffle = () => {
		routerTo('/pages_raffle/edit/edit')
	}
	const queryList = (pageNo, pageSize) => {
		const data = []
		setTimeout(() => {
			for(let i = 0; i < pageSize; i++) {
				let item = {
					id: i,
					title: Math.random()
				}
				data.push(item)
			}
			pagingRef.value.complete(data)
		},2500)	
	}
</script>

<style>

</style>
