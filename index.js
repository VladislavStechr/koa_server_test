const PORT = 3000
const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
	ctx.body = 'Hello Koa'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
