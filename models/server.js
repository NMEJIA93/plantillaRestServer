const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.dbMongo');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        // conectar a Base de datos
        this.conectarBDmongo();

        // Middlewares
        this.middlewares();


        // Rutas de la aplicacion 
        this.routes();
    }


    async conectarBDmongo(){
        await dbConnection();
    }

    // Middlewares
    middlewares() {
        //Directorio publico
        this.app.use(express.static('public'));
        this.app.use(cors());

        // Parseo y Lectura del Body
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`el servidor esta escuchando por el puerto ${this.port}`)
        })
    }

}

module.exports = Server;