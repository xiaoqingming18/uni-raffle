import { uuid,getFileExtension } from "./tools.js"
import dayjs from 'dayjs'

/**
 * 路由跳转方法
 * @param {string} 路由路径  
 * @param {string}  = ['navigate','redirect','reLaunch'] 路由跳转方式
*/
export const routerTo = (url,type='navigate') => {
	if(type === 'navigate') {
		uni.navigateTo({
			url
		})
	} else if(type === 'redirect') {
		uni.redirectTo({
			url
		})
	} else if(type === 'reLaunch') {
		uni.reLaunch({
			url
		})
	} else {
		return '请传入正确的type参数'
	}
}

/**
 * 返回上级页面
 * @param {number} 返回的层级树木
*/
export const toBackPage = (delta = 1) => {
	uni.navigateBack({
		delta
	})
}

/**
 * 上传图片到 uniCloud
 *	@param {number} [count=1] 上传的图片数量，默认为 1
 *  @param {function} callback 回调函数，自动传入一个上传进度百分比的值 
 *  @@return {Promise<string>} 成功时返回上传的图片 URL
*/
export function uploadImgFile(count = 1,callback) {
	return new Promise((resolve,reject) => {
		const currentDate = dayjs().format('YYYYMMDD')
		uni.chooseImage({
			count: 1,
			success: (res) => {
				if(res.tempFilePaths.length > 0) {
					let filePath = res.tempFilePaths[0]
					let index = 0
					// 上传到 uniClous
					uni.showLoading({
						title: "上传中",
						mask: true
					})
					uniCloud.uploadFile({
						filePath: filePath,
						cloudPathAsRealPath: true,
						cloudPath: `raffle/${currentDate}/${uuid()}_${index}.${getFileExtension(filePath)}`,
						success: (res) => {
							resolve(res.fileID)
						},
						onUploadProgress: (e) => {
							let percentCompleted = Math.round(
								(e.loaded * 100) / e.total
							)
							callback(percentCompleted)
						},
						fail: (error) => {
							reject(error)
						},
						complete: () => {
							uni.hideLoading()
						},
					})
				}
			}
		})
	})
}