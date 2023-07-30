const authorize = (role) => (ctx, next) => {
	const userLoggedInRole = ctx.state.userLoggedIn.role
	if(userLoggedInRole !== role) {
		ctx.status = 403
		return
	}
	next()
}

module.exports = authorize
