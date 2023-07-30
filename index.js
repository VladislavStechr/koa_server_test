const Koa = require('koa')
const Router = require('@koa/router')
const { bodyParser } = require("@koa/bodyparser")
const jwt = require('jsonwebtoken')
const { SECRET, PORT } = require('./config')
const USERS = require('./users')
const authenticate = require('./middlewares/authenticate')
const authorize = require('./middlewares/authorize')

const messageStats = {
	numberOfCalls: 0,
	lastMessage: null
}

const app = new Koa()
const router = new Router()

router.post('/login', (ctx) => {
	const {username, password} = ctx.request.body
	const user = USERS.find((user) => user.username === username && user.password === password)
	if(!user) {
		ctx.status = 401
		ctx.body = { error: 'Username or password invalid' }
		return
	}
	const token = jwt.sign({...user}, SECRET, { expiresIn: '15m' })
	ctx.body = { token }
})

router.post('/message', authenticate, (ctx) => {
	messageStats.lastMessage = ctx.request.body
	++messageStats.numberOfCalls

	ctx.status = 200;
	ctx.body = 'OK'
})

router.get('/stats', authenticate, authorize('admin'), (ctx) => {
	ctx.body = messageStats
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
