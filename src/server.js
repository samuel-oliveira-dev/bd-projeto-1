const express = require('express')
const bodyParser = require('body-parser')
const dataPer = require('./dataPersistence')

const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/usuario/:id', (req, resp, next)=>{
    resp.json(dataPer.getUser(req.params.id))
})
app.get('/usuarios', (req, resp, next)=>{
    resp.json(dataPer.getUsers());
})
app.post('/formulario', (req, resp, next)=>{
    console.log(resp.body)
    dataPer.saveUser(req.body.name, req.body.cpf, req.body.date)
    resp.send({...req.body})
})

app.listen(8080, ()=>{
    console.log('Executando aplicacao')
})