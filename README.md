# Koa server test

### Installation

1. Clone this repository
2. Run `npm install`

### Starting the Server
Run `npm start`

### Watch mode
Run `npm run dev`

## Usage
Login using given credentials via `POST login/` route.
Use generated JWT in Authorization header to access `GET stats/` and `POST messages/`

### DEV notes
There are comments in code with `TODO(prod)` to tackle things before this is production ready.
Some other global problems: 
- missing error handling, logging, monitoring
- missing tests, linter
- add deployment mechanism
