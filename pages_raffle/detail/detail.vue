<template>
	<view class="detail-page">
		<view class="main" :style="{paddingTop: getStatusBarHeight() + 'px'}">
			<view class="title-bar" :style="{height: getTitleBarHeight() + 'px'}">
				<view class="menu">
					<view v-if="routerPageLength > 1" class="item" @click="toBackPage">
						<uni-icons type="left" color="#fff" size="24"></uni-icons>
					</view>
					<view class="item" @click="routerTo('pages_raffle/list/list','redirect')">
						<uni-icons type="home-filled" color="#fff" size="24"></uni-icons>
					</view>
				</view>
				<view class="user-info">
					<view class="avatar">
						<image src="../../static/images/defAvatar.jpg" mode="aspectFill"></image>
					</view>
					<view class="username">用户昵称</view>
				</view>
			</view>
			
			<view class="status-group" @click="handleStartBtnClick">
				<view class="btn add"><text>{{`点击\n参与`}}</text></view>
				<view v-if="false" class="btn no-start">未开始</view>
				<view v-if="false" class="btn start">进行中</view>
				<view v-if="false" class="btn end">已结束</view>
			</view>
			
			<view class="count">
				<view class="text">
					已有 <text class="big">10</text> 人参与
				</view>
				<view class="group">
					<view class="pic" v-for="(item,index) in 6" :key="index" :style="{zIndex: 6-index}">
						<image src="../../static/images/logo.jpg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="body">
			<view class="item">
				<view class="title"> —— 奖品奖项 ——</view>
				<view class="content">
					<view class="row" v-for="item in 3">
						<view class="pic" @click="handleAwardPicClick">
							<image src="../../static/images/logo.jpg" mode="aspectFill"></image>
						</view>
						<view class="text">
							<view class="name">一等奖（10名）</view>
							<view class="description">iPhone 15</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item rule">
				<view class="title"> —— 规则说明 ——</view>
				<view class="content">
					<text>
						{{`
						1.点击参与报名参加活动；\n
						2.参与后无需额外操作，等待主办方发起抽奖；\n
						3.抽奖成功后会将抽奖结果返回，可在右上角点击查者；\n
						4.将获奖记录给现场工作人员核销后，领取对应的奖品。
						`}}
					</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="copyright">
				<text>
					{{`
					抽奖活动为学习交流使用\n
					不会发放真实的奖品\n
					最终解释权归主办方所有
					`}}
				</text>
			</view>
		</view>
	</view>
	
	<!-- 侧边按钮组 -->
	<view class="menu-bar">
		<view class="group" :style="{transform: menuState?'scale(1)':'scale(0)',opacity: menuState?1:0}">
			<view class="item" hover-class="item-hover" @click="routerTo('/pages_raffle/logs/logs')">
				<uni-icons type="gift-filled" size="26"></uni-icons>
				<view class="text">中奖记录</view>
			</view>
			<view class="item" hover-class="item-hover">
				<uni-icons type="undo-filled" size="26"></uni-icons>
				<view class="text">分享抽奖</view>
			</view>
			<view class="item" hover-class="item-hover" @click="routerTo('/pages_raffle/edit/edit')">
				<uni-icons type="gear-filled" size="26"></uni-icons>
				<view class="text">设置编辑</view>
			</view>
			<view class="item" hover-class="item-hover" @click="routerTo('/pages_raffle/start/start')">
				<uni-icons type="paperplane-filled" size="26"></uni-icons>
				<view class="text">抽奖管理</view>
			</view>
			<view class="item" hover-class="item-hover">
				<uni-icons type="scan" size="26"></uni-icons>
				<view class="text">扫码核销</view>
			</view>
		</view>
		<view class="close" @click="handleMenuStateChange" hover-class="close-hover">
			<uni-icons v-show="menuState" type="closeempty" size="20" color="#fff"></uni-icons>
			<uni-icons v-show="!menuState" type="list" size="20" color="#fff"></uni-icons>
		</view>
	</view>

	<!-- 抽奖弹出层 -->
	<uni-popup ref="popupRef" :is-mask-click="false" mask-background-color="rgba(0,0,0,0.8)">
		<view class="popuup-content">
			<view class="turntable">
				<image src="https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/turntable-rotate.png" mode="aspectFill"></image>
			</view>
		</view>
	</uni-popup>
	
	<uni-popup ref="resultPopupRef" :is-mask-click="false" mask-background-color="rgba(0,0,0,0.8)">
		<view class="result-popuup-content">
			<view v-if="true" class="bg win">
				<view class="text">一等奖</view>
			</view>
			<view v-if="false" class="bg loser"></view>
			<view class="close" @click="handleResultClose">
				<image src="https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/close.png" mode="aspectFill"></image>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import { ref } from "vue";
	import {getStatusBarHeight,getTitleBarHeight} from "@/utils/system.js"
	import {toBackPage,routerTo} from '@/utils/common.js'
	
	const routerPageLength = ref(getCurrentPages().length)
	const menuState = ref(true)
	const popupRef = ref(null)
	const resultPopupRef = ref(null)
	
	// 点击奖品图片预览大图
	const handleAwardPicClick = () => {
		uni.previewImage({
			urls: ['https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/raffleBg.webp']
		})
	}
	// 侧边栏展开收缩状态的切换
	const handleMenuStateChange = () => {
		menuState.value = !menuState.value
	}
	// 点击开始抽奖
	const handleStartBtnClick = () => {
	// 	popupRef.value.open()
		resultPopupRef.value.open()
	}
	const handleResultClose = () => {
		resultPopupRef.value.close()
	}
</script>

<style lang="scss" scoped>
.detail-page {
	min-height: 100vh;
	background: #F25039;
	
	.main {
		position: relative;
		height: 1566rpx;
		background: url('https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/raffleBg.webp') no-repeat center top;
		background-size: cover;
		
		.title-bar {
			width: fit-content;
			display: flex;
			align-items: center;
			height: 100%;
			
			.menu {
				display: flex;
				align-items: center;
				background-color: rgba(0,0,0,0.6);
				border-radius: 200rpx;
				height: 80%;
				margin-left: 20rpx;
				
				.item {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					aspect-ratio: 1 / 1;
				}
			}
			
			.user-info {
				display: flex;
				align-items: center;
				height: 100%;
				margin-left: 30rpx;
				
				.avatar {
					height: 80%;
					aspect-ratio: 1 / 1;
					border-radius: 50%;
					overflow: hidden;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.username {
					padding-left: 15rpx;
					color: #fff;
					font-size: 36rpx;
					font-weight: bolder;
				}
			}
		}
		
		.status-group {
			width: 200rpx;
			height: 200rpx;
			position: absolute;
			top: 856rpx;
			left: 50%;
			transform: translateX(-50%);
			
			.btn {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				color: #fff;
				font-size: 46rpx;
				font-weight: bolder;
			}
			.add {
				background: #e02800;
				position: relative;
				animation:  anim1 1s infinite;
				
				&::after {
					content: '';
					display: block;
					width: 100%;
					height: 100%;
					border: 5px solid #e02800;
					position: absolute;
					top: 0;
					left: 0;
					border-radius: 50%;
					box-sizing: border-box;
					animation: anim2 1s infinite;
				}
			}
			
			.end {
				color: #db2b00;
			}
		}
		
		.count {
			width: 100%;
			position: absolute;
			top: 1330rpx;
			text-align: center;
			
			.text {
				font-size: 34rpx;
				
				.big {
					font-weight: bolder;
				}
			}
			
			.group {
				display: flex;
				align-items: center;
				justify-content: center;
				transform: translateX(8rpx);
				
				.pic {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 2px solid #fff;
					margin-left: -15rpx;
					box-shadow: 0 0 10rpx rgba(0,0,0,0.3);
					position: relative;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
	.body {
		min-height: 200rpx;
		background: url('https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/raffle-repeat.jpg') repeat-y center;
		background-size: contain;
		padding: 0 70rpx;
		
		.title{
			font-size: 50rpx;
			color: #e02800;
			font-weight: bolder;
			text-align: center;
		}
		
		.content {
			padding: 40rpx 0;
		}
		
		.item {
			padding-bottom: 20rpx;
			
			&:last-child {
				padding-bottom: 0;
			}
			
			&.rule {
				.content {
					font-size: 40rpx;
					line-height: 1.8rem;
				}
			}
			
			.content {
				.row {
					display: flex;
					align-items: center;
					padding-bottom: 30rpx;
					
					&:last-child {
						padding-bottom: 0;
					}
					
					.pic {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						overflow: hidden;
						border: 1px solid #e02800;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.text {
						padding: 20rpx;
						
						.name {
							font-size: 38rpx;
							font-weight: bolder;
						}
						
						
						.description {
							font-size: 32rpx;
							color: #888;
							padding-top: 10rpx;
						}
					}
				}
			}
		}
	}
	
	.footer {
		min-height: 200rpx;
		background: url('https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/raffle-footer.jpg') no-repeat center top;
		background-size: contain;
		
		.copyright {
			font-size: 28rpx;
			text-align: center;
			line-height: 1.8rem;
			padding: 140rpx 0 60rpx;
			color: #fff;
			opacity: 0.8;
		}
	}
}

// 侧边 MenuBar
.menu-bar {
	position: fixed;
	top: 50%;
	right: 15rpx;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.group {
		display: grid;
		gap: 30rpx;
		transition: 0.25s;
		transform-origin: bottom center;
		
		.item {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			border: 2px solid #000;
			background-color: #F8EA00;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 15rpx rgba(0,0,0,0.65);
			
			&-hover {
				transform: scale(0.95);
			}
			
			.text {
				font-size: 24rpx;
				transform: scale(0.8);
			}
		}
	}
	
	.close {
		width: 70rpx;
		height: 70rpx;
		background-color: rgba(0,0,0,0.9);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		line-height: 1rem;
		color: #fff;
		
		&-hover {
			transform: scale(0.9);
		}
	}
}

// 结果弹出层
.popuup-content {
	width: 744rpx;
	height: 1016rpx;
	position: relative;
	background: url('https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/turntable.png') no-repeat center;
	background-size: contain;
	
	.turntable {
		width: 522rpx;
		height: 522rpx;
		position: absolute;
		top: 69rpx;
		left: 111rpx;
		animation: rotate 0.8s infinite linear;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
}

.result-popuup-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 15rpx;
	
	.bg {
		position: relative;
		background: no-repeat center;
		background-size: cover;
	}
	.win {
		width: 750rpx;
		height: 855rpx;
		background-image: url('https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/win.png');
		
		.text {
			position: absolute;
			width: 100%;
			top: 720rpx;
			left: 0;
			color: #fff;
			font-size: 46rpx;
			font-weight: bolder;
			line-height: 120rpx;
			text-align: center;
		}
	}
	.loser {
		width: 561rpx;
		height: 528rpx;
		background-image: url('https://mp-6fb6602c-05e5-4622-9779-a75bf3ece758.cdn.bspapp.com/uni-raffle/loser.png');
	}
	
	.close {
		box-sizing: content-box;
		margin-top: 80rpx;
		width: 90rpx;
		height: 90rpx;
		padding: 10rpx;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
}

@keyframes anim1 {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes anim2 {
	0% {
		transform: scale(1);
		border-width: 5px;
	}
	100% {
		transform: scale(1.6);
		border-width: 1px;
		opacity: 0;
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
