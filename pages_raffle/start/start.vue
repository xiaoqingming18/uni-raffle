<template>
	<view class="start">
		<view class="options">
			<view class="row">
				<view class="left">奖项选择:</view>
				<view class="right">
					<uni-data-select
						v-model="formData.a_id"
						:localdata="range"
						@change="onSelectChange"
					></uni-data-select>
				</view>
			</view>
			<view class="row">
				<view class="left">抽取个数:</view>
				<view class="right">
					<uv-number-box v-model="formData.count" :min="0"></uv-number-box>
				</view>
			</view>
		</view>
		
		<view class="btn-group">
			<view class="btn" hover-class="btn-hover" hover-stay-time="0">
				<text class="nostart" v-if="false">点击\n抽奖</text>
				<text class="start" v-if="false">停止</text>
				<text class="end" v-if="true">已结束</text>
			</view>
		</view>
		
		<view class="logs">
			<view class="title">—— 开奖记录 ——</view>
			<view class="content">
				<uni-list>
					<uni-list-item 
						v-for="(item,index) in 5" 
						:key="item"
						clickable
						:to="`./list`"
						showArrow
						:title="`第${index + 1}轮抽奖`"
						note="一等奖 - 10人"
						rightText="2024-10-10 10:10"
					></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const formData = ref({
		a_id: '',
		count: 0
	})
	const range = ref([
		{value: 0,text: '一等奖'},
		{value: 1,text: '二等奖'},
		{value: 2,text: '三等奖'}
	])
	
	// 下拉框选择事件
	const onSelectChange = (e) => {
		formData.count = 0
	}
</script>

<style lang="scss" scoped>
.start {
	.options {
		.row {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 30rpx;
			
			.right {
				flex: 1;
			}
		}
	}
	
	.btn-group {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
		
		.btn {
			width: 260rpx;
			height: 260rpx;
			font-size: 46rpx;
			color: #fff;
			font-weight: bolder;
			
			text {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				position: relative;
				background: #ccc;
			}
			.nostart {
				background-color: #ff6a33;
			}
			.start {
				background-color: #ee4626;
				
				&::before {
					content: '';
					display: block;
					position: absolute;
					width: 110%;
					height: 110%;
					top: -5%;
					left: -5%;
					border: 1px solid transparent;
					border-top-color: #ee4626;
					border-radius: 50%;
					box-sizing: border-box;
					animation: rotate 0.7s infinite linear;
				}
				&::after {
					content: '';
					display: block;
					position: absolute;
					width: 120%;
					height: 120%;
					top: -10%;
					left: -10%;
					border: 1px solid transparent;
					border-left-color: #ee4626;
					border-radius: 50%;
					box-sizing: border-box;
					animation: rotate 1.2s infinite linear;
				}
			}
			.end {
				background-color: #888;
			}
			
			&-hover {
				transform: scale(0.98);
			}
		}
	}
	
	.logs {
		padding: 100rpx 30rpx;
		
		.title {
			text-align: center;
			font-size: 36rpx;
			color: #999;
			font-weight: bolder;
		}
		
		.content {
			padding: 50rpx 0;
		}
	}
}

@keyframes rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
