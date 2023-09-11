const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const taskRouter = require('./routes/taskRoutes')


const api = express()

api.use(cors())
api.use(express.json())
api.use(logger('dev'))

api.get('/', (req, res) => {
    res.json({
        name: "PomoDogo",
        description: "See your tasks"
    })
})

api.use('/tasks', taskRouter)


module.exports = api
