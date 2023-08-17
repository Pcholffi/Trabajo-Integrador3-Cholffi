const multer = require('multer')
const path = require('path');

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

module.exports = upload;