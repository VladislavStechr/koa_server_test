const Koa = require('koa')
const { bodyParser } = require('@koa/bodyparser')
const { PORT } = require('./config')
const { initMessageStats, savePermanentMessageStats } = require('./repositories/messageStats')
const router = require('./routes')

const teardown = () => {
	savePermanentMessageStats()
	process.exit()
}

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

initMessageStats()

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})

process.on('SIGINT', teardown)
process.on('uncaughtException', teardown)
