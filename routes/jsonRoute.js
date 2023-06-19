const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const idNum = {
    userId: null,
};

router.post('/newUser', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json', 'utf8');
        let newData = JSON.parse(data);

        const isRegistered = Object.values(newData).some(user => user.name === req.body.name);
        if (isRegistered) {
            res.status(403).send('ERROR');
            return;
        }

        const id = new Date().getTime();
        newData[id] = req.body;
        console.log(req.body);

        await fs.writeFile('./db/db.json', JSON.stringify(newData));
        res.send(JSON.stringify([newData[id]]));
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post('/auth/:id', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json', 'utf8');
        let newAuth = JSON.parse(data);

        for (const [key, value] of Object.entries(newAuth)) {
            if (value.name === req.body.nameAuth && value.lastname === req.body.lastnameAuth) {
                userId = key;
                req.body.id = userId;
                req.params.id = userId;

                idNum.userId = userId;

                console.log(req.body);
            }
        }

        await fs.writeFile('./db/db.json', JSON.stringify(newAuth));
        res.send(JSON.stringify());
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.post('/notes', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json', 'utf8');
        let newNotes = JSON.parse(data);
        const userId = idNum.userId; 
        // console.log('newNotes', newNotes)
        // console.log(userId, req.body);

        if (!Array.isArray(newNotes[userId])) {
            newNotes[userId] = [];
        }
        newNotes[userId].push(req.body);

        await fs.writeFile('./db/db.json', JSON.stringify(newNotes));
        res.send(JSON.stringify(newNotes[userId]));
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

router.delete(`/delete/:noteId`, async(req,res)=>{
    try {
        console.log(`deleting...`, req.params);
        const newDel = JSON.parse(await fs.readFile(`./db/db.json`, `utf8`));
    
        const noteId = req.params.noteId
    
        if (!Array.isArray(newDel[noteId])) {
            newDel[noteId] = [];
        }
        newDel[noteId].push(req.body);
        console.log('noteId',noteId)

        if (newDel.hasOwnProperty(noteId)) {
            delete newDel[noteId];
            await fs.writeFile('./db/db.json', JSON.stringify(newDel));
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
})

module.exports = router;