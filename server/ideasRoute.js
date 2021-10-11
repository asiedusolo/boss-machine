const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');
const ideasRouter = express.Router()
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db.js')

ideasRouter.use(['/', '/:ideaId'], checkMillionDollarIdea)

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
        if(req.atLeastOneMillion){
            const newIdea = addToDatabase('ideas', req.body)
            res.status(201).send({
                idea: newIdea
            })
        }else{
            res.status(400).send()
        }
        
    }
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId
    const ideaToUpdate = getFromDatabaseById('ideas', ideaId);
    if (ideaToUpdate && req.atLeastOneMillion) {
        req.body.id = ideaToUpdate.id
        const updatedIdea = updateInstanceInDatabase('ideas', req.body);
        res.send({
            idea: updatedIdea
        });
      } else {
        res.status(404).send();
      }
          
    
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId
    const ideaToDelete = deleteFromDatabasebyId('ideas', ideaId)
    if(ideaToDelete){
        res.status(204).send()
    }else{
        res.status(404).send()
    }
})


module.exports = ideasRouter
