const express = require('express');
const meetingsRouter = express.Router()

const {getAllFromDatabase} = require('./db')

meetingsRouter.get('/', (req, res, next) => {
    const meetingsArray = getAllFromDatabase('meetings')
    res.send({
        meetings: meetingsArray
    })
})


module.exports = meetingsRouter
