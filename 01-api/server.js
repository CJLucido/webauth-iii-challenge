//LIBRARIES
const express = require('express')



//****IMPORT***** ROUTERS
const apiRouter = require('./api-router')

//IMPORT SESSION CONFIG
const configMiddleware = require('./config-middleware')

//CREATE SERVER PWRD BY EXPRESS
const server = express()

//CONFIG SESSIONS
configMiddleware(server)


//*****USE***** ROUTERS 
server.use('/api', apiRouter)

server.get('/', (req,res)=>{
    res.json({server: "server running"})
})

module.exports =server;