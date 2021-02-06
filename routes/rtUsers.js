const express = require('express')
const rtUsers = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')

rtUsers.get('/nuevo', (req,res)=>{
    res.render('usuarios/formulario')
})

rtUsers.post('/guardar',(req,res)=>{
    daoUsuarios.guardar(req.body)
        .then(resp=>{
            res.render('usuarios/formulario',{mensaje:resp,body:req.body})
        })
})

rtUsers.get('/login',(req,res)=>{
    res.render('usuarios/login')
})

rtUsers.post('/login',(req,res)=>{
    daoUsuarios.login(req.body)
        .then(respuesta=>{  
            if(respuesta==true)
                res.render('usuarios/login',{body:req.body,mensaje:"Password Correcto"})
            else
                res.render('usuarios/login',{body:req.body,mensaje:"Password Incorrecto"})
        })
    
})

module.exports= rtUsers