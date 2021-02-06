const express = require('express')
const rtMain = express.Router()

//aqui te creas las rutas get, post, etc.. que necesies

rtMain.get('/', function (req, res) {
    req.session.user='antonio'
    
    res.render('home')
})


module.exports=rtMain