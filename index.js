const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Product = require('./model/productModel')

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Getting from sever")
})


// Api for getting a single product Using ID 
app.get('/api/product/:id', async(req,res)=>{

  try{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product)
  }
  catch(error){
    res.status(500).json({message: error.message })
  }


})



// Api for getting all the products
app.get('/api/products', async(req, res)=>{
  try{
    const product = await Product.find({})
    res.status(200).json(product);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})



// Post API for adding Products 
app.post('/api/products', async(req, res)=>{
  try{
    const product = await Product.create(req.body);
    res.status(200).json(product)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})


// Update a product 
app.put('/api/product/:id', async(req, res)=>{
 try{
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id,req.body);
  if(!product){
    return res.status(500).json({message: error.message})
  }
  const updatedProduct = await Product.findById(id)
  res.status(200).json(updatedProduct)
 }
 catch(error){
  res.status(500).json({message: error.message})
 }
})

// Delete a Product 
app.delete('/api/product/:id', async(req, res)=>{
 try{
  const {id} = req.params;
  const product = await Product.findByIdAndDelete(id);
  if(!product){
    return res.status(500).json({message: error.message})
  }
  const allProduct = await Product.find({})
  res.status(200).json(allProduct);
 }
 catch(error){
  res.status(500).json({message: error.message})
 }
})

// Mongodb Connection 
mongoose.connect('mongodb+srv://admin:1234567890@practicecurd.fdxgday.mongodb.net/?retryWrites=true&w=majority&appName=practiceCurd'
)
  .then(() =>{ 
    app.listen(3000,() =>{

        console.log("working on port 3000")
    
    } )
    console.log('Database Connected!')})
  .catch(() => console.log('Connection Declined'))


