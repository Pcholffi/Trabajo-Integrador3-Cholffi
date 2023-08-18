/*-----------para errores historial en txt con hora------------------**********************-*/
const path = require('path');
const fs = require('fs');
const errorlogs = (error, req, res, next) => {
    console.log(error, error.message, error.status);
   // const logsDirectory = path.resolve(__dirname, '../logs');
    const logsFilePath = path.resolve(__dirname, '../logs/error_logs.txt');
    
    
    if (!fs.existsSync(logsFilePath)) {
        fs.mkdirSync(logsFilePath);// Crear el directorio de logs si no existe
        
    }
    const currentDateTime = new Date().toLocaleString();
    const logsIn = `${currentDateTime} - la ruta ingresada es: ${req.originalUrl}\n`
    fs.appendFileSync(logsFilePath, logsIn, (error) => {
        if (error){
            console.log("Error al registrar las URLs", error);
        }
        //next();
    });// Registrar la URL solicitada en el archivo de rutas_logs o informa el error

    next(); // No te olvides llamar a next() para pasar al siguiente middleware o controlador de ruta.
};

module.exports = errorlogs;
