// 创建唯一 id
export function uuid() {
	return Date.now().toString(36) + '_' + Math.random().toString(36).substring(3,9)
}

/**
 * 获取文件的扩展名
 * @param {string} filePath 文件名
 * @return {string} fileExtension 文件扩展名 
*/
export function getFileExtension(filePath) {
	return filePath.split('.').pop()
}