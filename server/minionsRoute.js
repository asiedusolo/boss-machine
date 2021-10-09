const express = require('express');
const minionsRouter = express.Router()
const {getAllFromDatabase} = require('./db')

minionsRouter.get('/', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions')
    res.send({
        minions: minionsArray
    })
})


module.exports = minionsRouter
