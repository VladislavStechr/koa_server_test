const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

const authenticate = (ctx, next) => {
	const token = ctx.request.headers.authorization

	if(!token) {
		ctx.status = 401
		return
	}

	// TODO(prod) add error handling
	const userLoggedIn = jwt.verify(token, SECRET)
	ctx.state.userLoggedIn = userLoggedIn
	next()
}

module.exports = authenticate
