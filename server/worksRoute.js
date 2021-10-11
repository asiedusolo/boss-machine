const express = require('express')
const { getFromDatabaseById, getAllFromDatabase, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db')
const worksRouter = express.Router({mergeParams: true})

worksRouter.get('/', (req, res, next) => {
    const minionId = req.params.minionId
    // console.log(req.params)
    const workArray = getAllFromDatabase('work')
    const workArrayByMinion = workArray.filter(work => {
        return work.minionId === minionId
    })
    if(workArrayByMinion){
        res.status(201).send({
            works: workArrayByMinion
        })
    }else{
        res.status(404).send()
    }
})

worksRouter.post('/', (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const hours = req.body.hours
    if(title === "" || description === "" || hours === ""){
        res.status(404).send()
    }else{
        req.body.minionId = req.params.minionId
        req.body.hours = Number(req.body.hours)
        const newWork = addToDatabase('work', req.body)
        if(newWork){
            res.send({
                work: newWork
            })
        }else{
            res.status(404).send()
        }
    }
})

worksRouter.put('/:workId', (req, res, next) => {
    const workId = req.params.workId
    const workToUpdate = getFromDatabaseById('work', workId)
    // console.log(workToUpdate)
    const title = req.body.title
    const description = req.body.description
    const hours = req.body.hours
    if(title === "" || description === "" || hours === ""){
        res.status(404).send()
    }else{
        req.body.hours = Number(req.body.hours)
        req.body.minionId = req.params.minionId
        if(workToUpdate){
            req.body.id = workToUpdate.id
            const updatedWork = updateInstanceInDatabase('work', req.body)
            if(updatedWork){
                res.send({
                    work: updatedWork
                })
            }
        }
        
    }
})

worksRouter.delete('/:workId', (req, res, next) => {
    const workId = req.params.workId
    const workToDelete = deleteFromDatabasebyId('work', workId)
    if(workToDelete){
        res.status(204).send()
    }else{
        res.status(403).send()
    }
    
        
})



module.exports = worksRouter