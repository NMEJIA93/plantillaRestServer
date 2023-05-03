const { response, request } = require('express')

const bcryptjs = require('bcryptjs')

const modelUsuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {
    //const { q, nombre = "no name", apikey, page = 1, limit } = req.query;
    const query = { estado: true };

    //paginar los resultados 
    const { limite = 5, desde = 0 } = req.query
    /*
   const usuarios = await modelUsuario.find(query)
       .skip(Number(desde))
       .limit(Number(limite));

   const total = await modelUsuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
        modelUsuario.countDocuments(query),
        modelUsuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        /* msg: 'get API - Controlador',
        q,
        nombre,
        apikey */
        total,
        usuarios

    });
}


const usuariosPost = async (req, res = response) => {
    /* const { nombre, edad } = req.body; */
    const { nombre, correo, password, rol } = req.body; // prueba
    const usuario = new modelUsuario({ nombre, correo, password, rol });


    // verificar si el correo existe
    /* const existeEmail = await modelUsuario.findOne({ correo }) // esta linea busca en la base de datos si existe este correo
    if (existeEmail) {
        return res.status(400).json({ msg: 'el correo ya esta registrado' })
    } */
    //encriptar la contraseña 

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardar en Base de Datos

    await usuario.save();

    res.json({
        msg: 'Post API - Controlador',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // validar id contra base de datos 
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await modelUsuario.findByIdAndUpdate(id, resto);


    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - Controlador'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params


    // Borrar Fisicamente 
    //const usuario = await modelUsuario.findByIdAndDelete(id)

    //Deshabilitar el usuario 
const usuario = await modelUsuario.findByIdAndUpdate(id,{estado:false})

    res.json({
        msg: 'Delete API - Controlador',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete

}