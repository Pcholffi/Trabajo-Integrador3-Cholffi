const path = require('path');
const fs = require('fs');
const { response } = require('express');

const ruta =  path.resolve(__dirname, '../data/products.json');
const jsonProducts = fs.readFileSync(ruta, { encoding: 'utf-8'});
let products = JSON.parse(jsonProducts);
//console.log(jsonProducts)



const controller = {
    listar:(req, res) =>{
        res.json(products);
    },
    detalle:(req, res) =>{
        const productId = parseInt(req.params.id);
    const product = products.find((producto) => producto.id === productId);
    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado.' });
    }
    res.json(product);
    },
    crear: (req, res)=>{
        let product={};
        if (req.body.name){
            return req.status(400).json({ msg: 'Producto sin nombre asignado'})
        }

        product.id = products.length +1;
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
        product.image = req.body.image;

        products.push(product);

        let productsJson = JSON.stringify(products, null, 4);
        fs.writeFileSync(ruta, productsJson, {encoding: 'utf-8'})
        res.status(201).json(product);
        //console.log(product)
        res.json('crear un producto');
    },
    eliminar: (req, res) => {
        const productId = parseInt(req.params.id);
        const productIndex = products.findIndex(producto => producto.id === productId);// Buscar el ID proporcionado
        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Producto no encontrado. Verifique el Id Ingresado' });// Si el producto no esta, envio una respuesta de error.
        }

        const productoEliminado = products.splice(productIndex, 1);// borro el producto del array de productos.
        let productsJson = JSON.stringify(products, null, 4);// tengo que refrescar el archivo JSON con la lista de productos actualizada.
        fs.writeFileSync(ruta, productsJson, { encoding: 'utf-8' });//reescribo el archivo
        const response = { msg: `Producto con ID ${productId} eliminado exitosamente.`, producto: productoEliminado[0] };
        //res.json({ msg: `Producto con ID ${productId} eliminado exitosamente.`, producto: productoEliminado[0] });//producto eliminado.
        res.json(response);
},
    buscar: (req, res) => {
        const searchTerm = req.query.nombre;

        const resultadosBusqueda = buscarProductoPorNombre(searchTerm);
            res.json(resultadosBusqueda);
},
};

    function buscarProductoPorNombre(nombre) {
        return products.filter((producto) =>
            producto.name.toLowerCase().includes(nombre.toLowerCase())
);

};
    module.exports = controller;