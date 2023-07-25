const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');//es para cargar las imagenes
const router = express.Router();
let controller = require('../controllers/ProductsControllers');

const storageProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/imagenes'))
    },
    filename: (req, file, cb) => {
        //console.log(path.extname(file.originalname));
        //console.log()
        cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage: storageProducts});
/*-----------para el historial en txt con hora------------------**********************-*/
const logs = (req, res, next) => {
    const logsDirectory = path.resolve(__dirname, '../logs');
    const logsFilePath = path.resolve(logsDirectory, 'rutas_logs.txt');
    
    
    if (!fs.existsSync(logsDirectory)) {
        fs.mkdirSync(logsDirectory);// Crear el directorio de logs si no existe
        
    }
    const currentDateTime = new Date().toLocaleString();
    fs.appendFileSync(logsFilePath, `${currentDateTime} - la ruta ingresada es: ${req.originalUrl}\n`, new Date());// Registrar la URL solicitada en el archivo de rutas_logs

    next(); // No te olvides llamar a next() para pasar al siguiente middleware o controlador de ruta.
};

router.get('/listar', logs, controller.listar);
router.get('/detalle', logs, controller.detalle);
//router.get('/crear', controller.crear);
router.post('/crear', logs, upload.single('image'), controller.crear);
router.delete('/eliminar/:id', logs, controller.eliminar);
//router.get('/buscar/', logs, controller.buscar);
router.post('/buscar/', logs, controller.buscar);
//const id = req.params.id;

module.exports = router;
