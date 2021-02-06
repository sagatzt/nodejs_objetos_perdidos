const express = require('express')
//const cookieParser = require('cookie-parser')
const app = express()
const session = require('express-session')
const rtMain = require('./routes/rtMain')
const rtUsers = require('./routes/rtUsers')
const rtObjetos = require('./routes/rtObjetos')
var exphbs  = require('express-handlebars')
const conexion = require('./conexion')
const fileUpload = require('express-fileupload')

//configuración del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(fileUpload())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(session({ //gestión de sesiones
    secret: 'miclavesecreta',
    resave: false,
    saveUninitialized: true
}))
//middleware para capturar la session:
app.use(function (req, res, next) {
    res.locals.session = req.session
    next()
})

//base de datos mongodb
conexion.on('error',console.error.bind(console,"Error de conexion mongo"))
conexion.once('open',()=>console.log("Conexión mongo OK!!"))

//enrutador principal
app.use('/',rtMain)
app.use('/usuarios',rtUsers)
app.use('/objetos',rtObjetos)

//arrancamos el servidor:
app.listen(8080,(err)=>{
    console.log('Server run on port 8080')
})