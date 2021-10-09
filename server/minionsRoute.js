const express = require('express');
const minionsRouter = express.Router()
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase} = require('./db')

minionsRouter.get('/', (req, res, next) => {
    const minionsArray = getAllFromDatabase('minions')
    res.send({
        minions: minionsArray
    })
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    const minion = getFromDatabaseById('minions', minionId)
    if(minion){
        res.send({
            minion: minion
        })
    }else{
        res.status(404).send()
    }
})



module.exports = minionsRouter
