const express = require('express')
const app = express()
const ProductManager = require('./ProductManager')

const productManager = new ProductManager('./products.json')

app.use(express.urlencoded({extended:true}))

app.get('/products', async(req, res) => {
    let products = await productManager.getProducts()
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    products =  products.slice(0, limit);
    res.send(products)
})
app.get('/products/:pid', async(req, res) => {
    const productId = parseInt(req.params.pid)
    const product = await productManager.getProductById(productId)
    if(product){
        res.send(product)
    }else {
        res.status(404).send({status:"error", message: "Not found"});
    }
    
})
const PORT = 8080
app.listen(PORT, () => {
    console.log('running server in port 8080')
})