const mongoose = require('mongoose');

module.exports = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/geek');
        console.log('conexion establecida');
    } catch (error) {
        console.log(error,'Reiniciar Sistema');
    }
}
//module.exports = connect