function beforeRegister({
	userRecord,
	clientInfo
} = {}) {
	userRecord.nickname = userRecord.nickname ? userRecord.nickname :
	"游客" + (Math.random().toString(36).substring(3,9))
	
	return userRecord
}

module.exports = {
	beforeRegister
}