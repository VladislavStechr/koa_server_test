const Koa = require('koa')
const Router = require('@koa/router')
const { bodyParser } = require("@koa/bodyparser")
const jwt = require('jsonwebtoken')

const PORT = 3000
const SECRET = 'secret'
const USERS = [
	{username: 'admin', password: 'secret'},
	{username: 'user', password: 'secret'},
]

const messageStats = {
	count: 0,
	latestMessage: null
}

const app = new Koa()
const router = new Router()

const authenticate = (ctx, next) => {
	const token = ctx.request.headers.authorization

	if(!token) {
		ctx.status = 401
		return
	}

	const userLoggedIn = jwt.verify(token, SECRET)
	ctx.state.userLoggedIn = userLoggedIn
	next()
}

router.post('/login', (ctx) => {
	const {username, password} = ctx.request.body
	const user = USERS.find((user) => user.username === username && user.password === password)
	if(!user) {
		ctx.status = 401
		ctx.body = { error: 'Username or password invalid' }
		return
	}
	const token = jwt.sign({username, password}, SECRET)
	ctx.body = { token }
})

router.post('/message', authenticate, (ctx) => {
	messageStats.latestMessage = ctx.request.body
	++messageStats.count

	ctx.status = 200;
	ctx.body = 'OK'
})

router.get('/stats', authenticate, (ctx) => {
	ctx.body = messageStats
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
