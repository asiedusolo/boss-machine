const express = require('express')
const { getFromDatabaseById, getAllFromDatabase, addToDatabase } = require('./db')
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



module.exports = worksRouter