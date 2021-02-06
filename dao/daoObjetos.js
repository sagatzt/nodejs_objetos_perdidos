const Objeto = require('../models/Objeto')

const daoObjetos={}

//guardar
daoObjetos.guardar = function save(objeto){
    return new Promise((resolved)=>{
        let o = new Objeto(objeto)
        if(o.errores.length<=0) o.save()
        resolved(o)
    })
}
//listar
daoObjetos.listar = function find(){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find().lean())
    })
}
//buscar

daoObjetos.listarPorTitulo = function findByTitle(titulo){
    return new Promise((resolved, reject)=>{
        resolved(Objeto.find({titulo:titulo}).lean())
    })
}
//eliminar

//modificar

module.exports=daoObjetos