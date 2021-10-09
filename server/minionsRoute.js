const express = require('express');
const minionsRouter = express.Router()

minionsRouter.get('/', (req, res, next) => {
    res.send('<h1>Hello future millionaires</h1>')
})


module.exports = minionsRouter
