const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: false
},
    User: {
        type: String,
        required: true
},
    category: String,
    Password: {
        type: Number,
        required: true
},
    image: String,
});

const Product = mongoose.model('Product', userSchema);