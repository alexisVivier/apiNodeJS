const app = require('express')()
const user = require('./user')
const item = require('./item')
const list = require('./list')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/user', user)

app.listen(9999, () => {
    console.log('App listening on port 9999')
})

function loggerMiddleware(req, res, next) {
    console.log(`New request received :<== [${req.method}] ${req.originalUrl}`) 
    next()
}

app.use(loggerMiddleware)
