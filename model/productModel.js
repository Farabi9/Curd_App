const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter product name']
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;