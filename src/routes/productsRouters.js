/*-------------------------------------------------------productsRouters.js---------------------------------------------------------*/
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');//es para cargar las imagenes
const router = express.Router();
const logs = require('../middlewares/loggs');
const upload = require('../middlewares/storage');
let controller = require('../controllers/ProductsControllers');




router.get('/listar',logs, controller.listar);
router.get('/detalle/:id', logs, controller.detalle);
router.post('/crear', logs, upload.single('image'), controller.crear);
router.put('/update', logs, controller.update);
router.delete('/eliminar/:id', logs, controller.eliminar);
router.get('/buscar/', logs, controller.buscar);//-accedo con query/products/buscar?nombre=cepillo
//const id = req.params.id;

module.exports = router;
