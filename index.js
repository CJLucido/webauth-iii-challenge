require('dotenv').config()

const server = require('./01-api/server')


const PORT = process.env.PORT

server.listen(PORT, ()=> console.log(`\n Running on port: ${PORT} \n`))