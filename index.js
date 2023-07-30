const PORT = 3000
const Koa = require('koa')
const Router = require('@koa/router')
const { bodyParser } = require("@koa/bodyparser")

const messageStats = {
	count: 0,
	latestMessage: null
}

const app = new Koa()
const router = new Router()

router.post('/message', (ctx) => {
	messageStats.latestMessage = ctx.request.body
	++messageStats.count

	ctx.status = 200;
	ctx.body = 'OK'
})

router.get('/stats', (ctx) => {
	ctx.body = messageStats
})

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
