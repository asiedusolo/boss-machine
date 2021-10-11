const express = require('express')
const { getFromDatabaseById, getAllFromDatabase } = require('./db')
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
    
})



module.exports = worksRouter