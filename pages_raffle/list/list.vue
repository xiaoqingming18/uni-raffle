<template>
	<view class="raffle-list">
		<z-paging ref="pagingRef" v-model="dataList" @query="queryList">
			<template #loading>
				<uni-load-more status="loading" />
			</template>
			<uni-list border v-if="dataList.length">
				<uni-list-item v-for="item in dataList" :key="item._id" :title="item.title" :note="`创建于${dayjs(item.create_date).format('YYYY-MM-DD HH:mm')}\n已参与${item.join_count}人`" :rightText="statusCode2text(item.active_state)" showArrow clickable @click="routerTo('/pages_raffle/detail/detail')"></uni-list-item>
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
	import {routerTo,statusCode2text} from '@/utils/common.js'
	import dayjs from 'dayjs'
	
	const db = uniCloud.database()
	const pagingRef = ref(null)
	const dataList = ref([])
	
	// 跳转新增抽奖页面
	const handleAddRaffle = () => {
		routerTo('/pages_raffle/edit/edit')
	}
	const queryList = async (pageNo, pageSize) => {
		const res = await db.collection("raffle-data").orderBy('create_date desc').get()
		console.log(res.result)
		pagingRef.value.complete(res.result.data)
	}
</script>

<style>

</style>
