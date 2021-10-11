const express = require('express');
const ideasRouter = express.Router()
const {getAllFromDatabase, getFromDatabaseById, addToDatabase} = require('./db.js')

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

ideasRouter.post('/', (req, res, next) => {
    console.log('Got Body: ', req.body)
    const name = req.body.name
    const description = req.body.description
    const weeklyRevenue = req.body.weeklyRevenue
    const numWeeks = req.body.numWeeks
    if(name === "" || description === "" || weeklyRevenue === "" || numWeeks === ""){
        res.status(400).send()
    }
    else{
        req.body.weeklyRevenue = Number(weeklyRevenue)
        req.body.numWeeks = Number(numWeeks)
        const newIdea = addToDatabase('ideas', req.body)
        res.status(201).send({
            idea: newIdea
        })
    }
})


module.exports = ideasRouter
