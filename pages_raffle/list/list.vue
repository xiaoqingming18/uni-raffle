<template>
	<view class="raffle-list">
		<z-paging ref="pagingRef" v-model="dataList" @query="queryList">
			<template #loading>
				<uni-load-more status="loading" />
			</template>
			<uni-list border v-if="dataList.length">
				<uni-list-item v-for="item in dataList" :key="item._id" :title="`${item.nickname} - 创建的投票`" :note="`创建于${dayjs(item.create_date).format('YYYY-MM-DD HH:mm')}\n已参与${item.join_count}人`" :rightText="statusCode2text(item.active_state)" showArrow clickable @click="routerTo(`/pages_raffle/detail/detail?id=${item._id}`)"></uni-list-item>
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
	import {routerTo,showToast,statusCode2text} from '@/utils/common.js'
	import dayjs from 'dayjs'
	
	const db = uniCloud.database()
	const pagingRef = ref(null)
	const dataList = ref([])
	
	// 跳转新增抽奖页面
	const handleAddRaffle = () => {
		routerTo('/pages_raffle/edit/edit')
	}
	const queryList = async (pageNo, pageSize) => {
		const raffleTemp = db.collection("raffle-data").orderBy('create_date desc').getTemp()
		const userTemp = db.collection('uni-id-users').field('_id,nickname').getTemp()
		
		// 连表查询（user表和 raffle表）
		try {
			const {result:{data,errCode}} = await db.collection(raffleTemp,userTemp)
			.field("active_state,create_date,join_count,arrayElemAt(user_id.nickname,0) as nickname,_id").get()
			console.log(data)
			if(errCode ===0) {
				pagingRef.value.complete(data)
			} else {
				pagingRef.value.complete(false)
			}
		} catch(err) {
			showToast(err)
		}
	}
</script>

<style>

</style>
