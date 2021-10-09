const express = require('express');
const meetingsRouter = express.Router()

meetingsRouter.get('/', (req, res, next) => {
    res.send('<h1>Hello future millionaires let schedule and discuss billion dollar ideas</h1>')
})


module.exports = meetingsRouter
