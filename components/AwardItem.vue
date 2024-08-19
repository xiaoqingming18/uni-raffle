<template>
	<view class="award-item">
		<view class="user-info">
			<image class="avatar" src="../static/images/logo.jpg" mode="aspectFill"></image>
			<view class="username">匿名</view>
		</view>
		<view class="body">
			<view class="left">
				<image class="pic" src="../static/images/logo.jpg" mode="aspectFill"></image>
			</view>
			<vire class="right">
				<view class="title">一等奖</view>
				<view class="info">
					<view class="line">奖品：iPhone手机</view>
					<view class="line">轮次：第3轮中奖</view>
					<view class="line">时间：2024-08-19 10:06</view>
					<view class="line">
						<button type="primary" size="mini">手动核销</button>
					</view>
				</view>
			</vire>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.award-item {
	border: 1px solid #eee;
	border-radius: 10rpx;
	border-bottom-width: 3px;
	
	.user-info {
		height: 80rpx;
		background-color: #eee;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		
		.avatar {
			width: 60rpx;
			height: 60rpx;
			border: 1px solid #fff;
			border-radius: 50%;
		}
		
		.username {
			font-size: 32rpx;
			font-weight: bolder;
			margin-left: 15rpx;
		}
	}
	
	.body {
		display: flex;
		padding: 30rpx;
		
		.left {
			width: 230rpx;
			height: 230rpx;
			
			.pic {
				width: 100%;
				height:100%
			}
		}
		
		.right {
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.title {
				font-size: 38rpx;
				font-weight: bolder;
			}
			
			.info {
				margin-top: 30rpx;
				font-size: 28rpx;
				color: #666;
				line-height: 1.5em;
				
				.line {
					padding-bottom: 10rpx;
				}
			}
		}
	}
}
</style>