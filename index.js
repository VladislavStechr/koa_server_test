const PORT = 3000
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
	ctx.body = 'Hello Koa'
})

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
