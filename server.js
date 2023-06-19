const express = require('express');
const path = require('path')
const jsonRoute = require('./routes/jsonRoute.js')
const server = express()
const fs = require('fs/promises')
const PORT = 3000

server.use(express.static('public'));

server.use(express.urlencoded({extended: true}))
server.use(express.json())




server.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname + '/src/index.html'))
})

server.use('/json', jsonRoute)








server.use(function(req, res){
    res.status(404).send("<h1>Sorry 404</h1>")
})
server.listen(PORT, () => console.log(`server starting on port ${3000}`)) 





