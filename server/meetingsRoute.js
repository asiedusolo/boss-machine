const express = require('express');
const meetingsRouter = express.Router()

const {getAllFromDatabase, addToDatabase, deleteAllFromDatabase} = require('./db')

meetingsRouter.get('/', (req, res, next) => {
    const meetingsArray = getAllFromDatabase('meetings')
    res.send({
        meetings: meetingsArray
    })
})

meetingsRouter.post('/', (req, res, next) => {
    console.log('Got Body: ', req.body)
    const time = req.body.time
    const date = req.body.date
    const day = req.body.day
    const note = req.body.note
    if(time === "" || day === "" || note === ""){
        res.status(400).send()
    }
    else{
        req.body.date = new Date(req.body.day).toISOString()
        req.body.day = new Date(req.body.day).toString().slice(0,15)
        const newMeeting = addToDatabase('meetings', req.body)
        res.status(201).send({
            meeting: newMeeting
        })
    }
})

meetingsRouter.delete('/', (req, res, next) => {
    const meetingsArray = deleteAllFromDatabase('meetings')
    if(meetingsArray){
        res.send({
            meetings: meetingsArray
        })
    }   
})


module.exports = meetingsRouter
