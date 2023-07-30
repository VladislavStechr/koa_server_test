const fs = require('fs')
const path = require('path')

const MESSAGE_STATS_FILE_PATH = path.resolve(__dirname, '../messageStats.json')

const DEFAULT_MESSAGE_STATS = {
	numberOfCalls: 0,
	lastMessage: null
}

let messageStats = DEFAULT_MESSAGE_STATS

const initMessageStats = () => {
	if(!fs.existsSync(MESSAGE_STATS_FILE_PATH)) return DEFAULT_MESSAGE_STATS
	const messageFileString = fs.readFileSync(MESSAGE_STATS_FILE_PATH, { encoding: 'utf8', flag: 'r' })
	messageStats = JSON.parse(messageFileString)
}

const getMessageStats = () => {
	return messageStats
}

const saveMessageStats = (lastMessage) => {
	messageStats.numberOfCalls += 1
	messageStats.lastMessage = lastMessage
}

const savePermanentMessageStats = () => {
	fs.writeFileSync(MESSAGE_STATS_FILE_PATH, JSON.stringify(messageStats), { encoding: 'utf8', flag: 'w' })
}

module.exports = {
	initMessageStats,
	getMessageStats,
	saveMessageStats,
	savePermanentMessageStats
}
