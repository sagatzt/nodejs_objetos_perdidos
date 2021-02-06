const mongoose = require("mongoose")
const {Schema} = mongoose

const bcrypt = require('bcrypt')

const schemaUsuario = new Schema({
    nombre: {type:String},
    email: {type:String, required:true, index: true, unique: true },
    password:{type:String, required:true},
    activo:{type:Boolean, default:false}
})

//esta función "captura" el método save() y ejecuta primero
//todo el código que tiene dentro. En este caso, antes de 
//guardar un usuario, hasheará el password: ;)
schemaUsuario.pre('save', function(next) {
    bcrypt.hash(this.password, 6)
        .then(hash=>{
            this.password = hash
            next()
        })
})

class Usuario{

    //set y get
    set emailMal(pepe){
        this.email=pepe.toLowerCase()
    }

    //privados
    comprobarPwd(password){
        //devuelve true si el password coincide y false si no
        return bcrypt.compare(password, this.password)
            .then(res=>{return res})
    }
}




schemaUsuario.loadClass(Usuario)
module.exports=mongoose.model('usuario',schemaUsuario)