const Usuario = require('../models/Usuario')
const mailer = require('../modules/mailer')
let daoUsuarios={}

//guardar
daoUsuarios.guardar=function guardar(usuario){
    return new Promise((resolved)=>{
        let u = new Usuario(usuario)
        u.save()
            .then(()=>{
                mailer.send(u.email)
                resolved(u)
            })
            .catch(err=>resolved(err))
    })
}

daoUsuarios.getUsuarioByEmail=function getUsuarioByEmail(email){
    return new Promise((resolved)=>{
        resolved(Usuario.findOne({email:email}))
    })
}

daoUsuarios.login=function login(credenciales){
    return new Promise((resolved)=>{
    daoUsuarios.getUsuarioByEmail(credenciales.email)
        .then(async usuario=>{
            let respuesta=await usuario.comprobarPwd(credenciales.password)
            resolved(respuesta)
        })
    })
}

//obtener

//eliminar

//modificar

//listar



module.exports = daoUsuarios