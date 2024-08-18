const SYSTEM_INFO = uni.getSystemInfoSync()

/**
 * 获取状态栏的高度
*/
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;

/**
 * 获取胶囊按钮的高度
*/
export const getTitleBarHeight = () => {
	if(uni.getMenuButtonBoundingClientRect) {
		let {top,height} = uni.getMenuButtonBoundingClientRect()
		return height + (top - getStatusBarHeight()) * 2
	} else {
		return 40
	}
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()

export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let {leftIcon: {left,width}} = tt.getCustomButtonBoundingCliendRect()
	return left + parseInt(width)
	// #endif
	
	// #ifdef MP-TOUTIAO
	return 0
	// #endif
}