const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {

    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo }) // esta linea busca en la base de datos si existe este correo
    if (existeEmail) {
        throw new Error(`El correo ${correo}, ya esta registrado`);
    }
}

const existeUsuarioPorID = async (id) => {
   const existeUsuario = await Usuario.findById( id ) // esta linea busca en la base de datos si existe este correo
    if (!existeUsuario) {
        throw new Error(`El ID  ${id}, No Existe`);
    } 
}





module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorID
}