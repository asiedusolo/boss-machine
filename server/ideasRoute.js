const express = require('express');
const ideasRouter = express.Router()
const {getAllFromDatabase, getFromDatabaseById} = require('./db.js')

ideasRouter.get('/', (req, res, next) => {
    const ideasArray = getAllFromDatabase('ideas')
    res.send({
        ideas: ideasArray
    })
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId
    const idea = getFromDatabaseById('ideas', ideaId)
    if(idea){
        res.send({
            idea: idea
        })
    } else{
        res.status(404).send()
    }
})


module.exports = ideasRouter
