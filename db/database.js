var mongoose = require('mongoose');
const dbConfig = require('../config/database.config.js');

const  conection = async () => {
    try{
        const db = await mongoose.connect(dbConfig.url);
        console.log("Conectado a la base de datos" + db.connection.name);
    }catch(error){
        console.log("No se pudo conectar a la base de datos", error);
        process.exit();
    }
}

exports.conection = conection;