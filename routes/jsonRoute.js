const express = require('express');
const router = express.Router()
const fs = require('fs/promises');
const idNum = {
    userId: null,
};

router.post('/new', async (req, res) => {
    const data = await fs.readFile('./db/db.json', 'utf8')
    let newData = JSON.parse(data)

    const id = new Date().getTime()
    newData[id] = req.body
    console.log(req.body)

    await fs.writeFile(`./db/db.json`, JSON.stringify(newData))
    res.send(JSON.stringify([newData[id]]))
    
})

router.post('/auth/:id', async (req, res) => {
    const data = await fs.readFile('./db/db.json', 'utf8')
    let newAuth = JSON.parse(data)

    for (const [key, value] of Object.entries(newAuth)) {
        if (value.name === req.body.nameAuth && value.lastname === req.body.lastnameAuth) {
            const userId = key
            req.body.id = userId
            req.params.id = userId

            idNum.userId = userId;

            console.log(req.body)
        }
    }
    
    await fs.writeFile(`./db/db.json`, JSON.stringify(newAuth))
    res.send(JSON.stringify())
    
})

router.post('/notes', async (req, res) => {
    const data = await fs.readFile('./db/db.json', 'utf8')
    let newNotes = JSON.parse(data)

    const userId = idNum.userId; 
   
    console.log(userId, req.body)

    if (!Array.isArray(newNotes[userId])) {
        newNotes[userId] = [];
    }

    newNotes[userId].push(req.body);

    await fs.writeFile('./db/db.json', JSON.stringify(newNotes));
    res.send(JSON.stringify(newNotes[userId]));
})






module.exports = router



