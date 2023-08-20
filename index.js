const app = require('express')()
require('dotenv').config();
const bodyParser = require('body-parser')
const utils = require('./utils')
const messages = require('./messages')

const db = require('./db');

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("OK")
})

app.post('/short', async (req, res) => {
    const response = await db.createEntity(req.body)
    res.status(403).send("")
})

app.post('/login', async (req, res) => {
    if(!utils.IsValidDocument(req.body.documentNumber)){
        res.status(400).send({error: messages.InvalidDocument})
    }
    if(req.body.password < 8)res.status(400).send(messages.InvalidPassword);

    const isCorrectPassword = await db.loginUser(req.body.documentNumber, req.body.password)
    if(isCorrectPassword) res.send("Login successfully")
    if(!isCorrectPassword) res.status(403).send("Failed login")
})

app.listen(process.env.PORT || 3000, () => console.log(`Server running at http://localhost:${process.env.PORT || 3000}`))

module.exports = app
