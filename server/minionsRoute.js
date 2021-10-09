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

minionsRouter.post('/', (req, res, next) => {
    console.log('Got Body: ', req.body)
    const name = req.body.name
    const title = req.body.title
    const salary = req.body.salary
    const weaknesses = req.body.weaknesses
    if(name === "" || title === "" || weaknesses === "" || salary === ""){
        res.status(400).send()
    }
    else{
        req.body.salary = Number(salary)
        const newMinion = addToDatabase('minions', req.body)
        res.status(201).send({
            minion: newMinion
        })
    }
})



module.exports = minionsRouter
