<template>
	<view class="edit-raffle">
		<uni-notice-bar show-icon text="最多可创建9个奖项,最多支持300人参与!" />
		<view class="awards">
			<view class="head-title">—— 奖品奖项 ——</view>
			<view class="option" v-for="(item,index) in awardList" :key="item.id">
				<view class="top">
					<view class="left" @click="addPic(index)">
						<view class="pic">
							<image v-if="item.picUrl" :src="item.picUrl" mode="aspectFill"></image>
							<uni-icons v-else type="image" size="50" color="#555"></uni-icons>
						</view>
						<view class="text">更换图片</view>
					</view>
					<view class="right">
						<view class="row">
							<view class="name">
								<input type="text" v-model="item.name" placeholder="请输入奖项名称" />
							</view>
							<view class="remove" @click="removeAward(index)">
								<uni-icons type="minus-filled" size="30" color="#ee4626"></uni-icons>
							</view>
						</view>
						<view class="row">
							<view>
								<input type="text" placeholder="请输入奖品描述" v-model="item.description" />
							</view>
						</view>
					</view>
				</view>
			
				<view class="row">
					<view class="name">奖品份数</view>
					<view>
						<uv-number-box v-model="item.count"></uv-number-box>
					</view>
				</view>
			</view>
			<!-- 增加一个奖项 -->
			<view class="add-option">
				<view class="btn" @click="addAward">+ 增加奖项</view>
			</view>
		</view>
		
		<view class="rule">
			<view class="head-title">—— 规则说明 ——</view>
			<view class="content">
				<textarea v-model="ruleContent" placeholder="请编辑规则说明"></textarea>
			</view>
		</view>
		
		<view class="more">
			<view class="head-title">—— 更多选项 ——</view>
			<view class="content">
				<view class="row">
					<view class="name">请选择结束时间</view>
					<view class="control">
						<uni-datetime-picker
						    v-model="endTime"
							type="datetime",
							:start="defaultTime.start"
							:end="defaultTime.end"
						/>
					</view>
				</view>
				
				<view class="row">
					<view class="name">是否能重复中奖</view>
					<view class="control">
						<switch :checked="isPepeat" @change="handleSwitchChange" color="#ee4626" style="transform: scale(0.8);transform-origin: right;"></switch>
					</view>
				</view>
			</view>
		</view>
		
		<view class="submit-btn" @click="onSubmit">
			<button type="primary">确认提交</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {uuid,getFileExtension} from '@/utils/tools.js'
	import { uploadImgFile,showToast } from '@/utils/common';
	import dayjs from 'dayjs';
	
	const ruleContent = ref(`1.点击参与报名参加活动；\n2.参与后无需额外操作，等待主办方发起抽奖；\n3.抽奖成功后会将抽奖结果返回，可在右上角点击查者；\n4.将获奖记录给现场工作人员核销后，领取对应的奖品。`)
	const awardList = ref([
		{
			id: uuid(),
			name: "一等奖",
			description: "",
			picUrl: "",
			count: 1
		},
		{
			id: uuid(),
			name: "二等奖",
			description: "",
			picUrl: "",
			count: 1
		}
	])
	const endTime = ref(null)
	const defaultTime = ref({
		start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		end: dayjs().add(7,'d').endOf('day')
	})
	const isPepeat = ref(false)
	
	// 上传奖项图片
	const addPic = (index) => {
		uploadImgFile(1,progress => {
			console.log(progress)
		}).then(fileUrl => {
			awardList.value[index].picUrl = fileUrl
		}).catch(err =>{
			throw err
		})
	}
	// 增加奖项
	const addAward = () => {
		awardList.value.push({
			id: uuid(),
			name: "",
			description: "",
			picUrl: "",
			count: 1
		})
	}
	// 删除奖项
	const removeAward = async (index) => {
		const res = await uni.showModal({
			title: "是否删除该奖项"
		})
		if(res.confirm) {
			awardList.value.splice(index,1)
		}
	}
	// 是否重复
	const handleSwitchChange = (e) => {
		isPepeat.value = e.detail.value
	}
	// 提交奖项
	const onSubmit = () => {
		if(!(awardList.value.length && awardList.value.every(item => item.name && item.description))) {
			showToast({title:'奖品名称和描述必填',duration:2500})
		}
		if(!ruleContent.value) return showToast({title:'抽奖规则必填',duration:2500})
	
		const formData = {
			awardList: awardList.value,
			ruleContent: ruleContent.value,
			isPepeat: isPepeat.value,
			endTime: endTime.value
		}
		console.log(formData)
	}
</script>

<style lang="scss" scoped>
.edit-raffle {
	.head-title {
		font-size: 34rpx;
		text-align: center;
		line-height: 2rem;
		font-weight: bold;
		color: #ee4626;
		padding-bottom: 30rpx;
	}
	
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 34rpx;
		border-bottom: 1px solid #f4f4f4;
		height: 100rpx;
		padding: 10rpx 0;
	}
	
	.awards {
		.option {
			padding: 20rpx;
			padding-bottom: 0;
			border-bottom: 14rpx solid #f4f4f4;
			
			.top {
				display: flex;
				
				.left {
					width: 160rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.pic {
						width: 120rpx;
						height: 120rpx;
						background-color: #f4f4f4;
						display: flex;
						align-items: center;
						justify-content: center;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
					
					.text {
						font-size: 28rpx;
						color: #999;
						line-height: 2em;
					}
				}
				
				.right {
					flex: 1;
					
					.row {
						.name {
							font-size: 38rpx;
							font-weight: bolder;
						}
					}
				}
			}
		}
		
		.add-option {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 60rpx 0;
			background: #f4f4f4;
			
			.btn {
				border: 1px solid #ee4626;
				padding: 15rpx 35rpx;
				color: #ee4626;
				font-size: 36rpx;
				border-radius: 200rpx;
			}
		}
	}
	
	.rule {
		padding: 20rpx;
		margin-top: 60rpx;
		
		textarea {
			background-color: #fafafa;
			border: 1px solid #efefef;
			width: 100%;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			line-height: 1.7em;
			font-size: 36rpx;
			min-height: 380rpx;
			color: #333;
		}
	}
	
	.more {
		margin-top: 60rpx;
		
		.content {
			padding: 20rpx;
			
			.control {
				width: 400rpx;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
	
	.submit-btn {
		padding: 60rpx 20rpx 100rpx;
		
		button {
			background-color: #ee4626;
		}
	}
}
</style>
