const path = require('path');//modulo nativo
const express = require('express');//modulo de tercero
const app = express();
const products = require('./routes/productsRouters');
/*-------ACORDATE DE PONER LOS PUNTOS Y COMA ;;;;-----*/



/*configuracion*/
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
/*-rutas-*/
app.use('/products', products);
app.use(function (req, res, next){
    return res.status(404).json({
        status:404,
        error: 'Resource not found on data base',
        message: 'Incorrect URL',
    })
}); //esta app siempre va al final de todas las rutas

app.listen(3000, () => console.log('Server Online en puerto 3000'));

