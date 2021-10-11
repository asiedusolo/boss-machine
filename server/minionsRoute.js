const express = require('express');
const minionsRouter = express.Router()
const {getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db')
const worksRouter = require('./worksRoute')

minionsRouter.use('/:minionId/work', worksRouter)


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

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    const minionToUpdate = getFromDatabaseById('minions', minionId);
    if (minionToUpdate) {
        // updateInstanceInDatabase('minions', minionToUpdate);
        req.body.id = minionToUpdate.id
        const updatedMinion = updateInstanceInDatabase('minions', req.body);
        res.send({
            minion: updatedMinion});
      } else {
        res.status(404).send();
      }
          
    
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    const minionToDelete = deleteFromDatabasebyId('minions', minionId)
    if(minionToDelete){
        res.status(204).send()
    }else{
        res.status(404).send()
    }
})



module.exports = minionsRouter
