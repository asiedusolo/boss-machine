const express = require('express');
const ideasRouter = express.Router()

ideasRouter.get('/', (req, res, next) => {
    res.send('<h1>Hello future millionaires with ideas</h1>')
})


module.exports = ideasRouter
