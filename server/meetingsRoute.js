const express = require('express');
const meetingsRouter = express.Router()

const {getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting} = require('./db')

meetingsRouter.get('/', (req, res, next) => {
    const meetingsArray = getAllFromDatabase('meetings')
    res.send(meetingsArray)
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting())
    if(newMeeting){
        res.status(201).send(newMeeting)
    }else{
        res.status(400).send()
    }
})

meetingsRouter.delete('/', (req, res, next) => {
    const meetingsArray = deleteAllFromDatabase('meetings')
    if(meetingsArray){
        res.status(204).send()
    }   
})


module.exports = meetingsRouter
