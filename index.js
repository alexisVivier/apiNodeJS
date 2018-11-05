const app = require('express')()
const user = require('./user')
const item = require('./item')
const list = require('./list')
const bodyParser = require('body-parser')
const fs = require('fs')


//Middleware qui permet d'avoir un historique des routes appellées
function loggerMiddleware(req, res, next) {
    let req_log = (`New request received :<== [${req.method}] ${req.originalUrl}\n`);
    fs.appendFile('req_log', req_log, 'utf8')
    next()
}

//Middleware qui permet de catch les err
function errMiddleware(err, res, next) {
    let err_log = (`New error received :<== [${err.method}] ${err.originalUrl}\n`);
    fs.appendFile('err_log', err_log, 'utf8')
    next()
}

app.use(loggerMiddleware)
app.use(errMiddleware)

app.use(bodyParser.json())
app.use('/user', user)
app.use('/item', item)
app.use('/list', list)

app.listen(9999, () => {
    console.log('App listening on port 9999')
})
