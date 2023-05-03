const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es Obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es Obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'la contraseña es Obligatorio'],

    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: true
    }
});


// reescribe el metodo para que no devuelva unos campos especificos 

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario}= this.toObject();
    return usuario;
};


module.exports = model('Usuario',UsuarioSchema )



/* {
    nombre: '',
    correo: '',
    password: '',
    img: '',
    rol: '',
    estado: false,
    google: false

} */