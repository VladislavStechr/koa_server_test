const Router = require('@koa/router')
const authenticate = require('./middlewares/authenticate')
const authorize = require('./middlewares/authorize')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const USERS = require('./users')
const { saveMessageStats, getMessageStats } = require('./repositories/messageStats')

const router = new Router()

router.post('/login', (ctx) => {
	const {username, password} = ctx.request.body
	const user = USERS.find((user) => user.username === username && user.password === password)
	if(!user) {
		ctx.status = 401
		// TODO(prod) better error handling mechanism + logging
		ctx.body = { error: 'Username or password invalid' }
		return
	}
	const token = jwt.sign({...user}, SECRET, { expiresIn: '15m' })
	ctx.body = { token }
})

router.get('/logout', (ctx) => {
	ctx.status = 200;
	ctx.body = 'logged out'
})

router.post('/message', authenticate, (ctx) => {
	saveMessageStats(ctx.request.body)

	ctx.status = 200;
	ctx.body = 'OK'
})

// TODO(prod) use constants for roles
router.get('/stats', authenticate, authorize('admin'), (ctx) => {
	ctx.body = getMessageStats()
})

module.exports = router