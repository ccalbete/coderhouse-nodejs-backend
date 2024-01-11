const express = require('express')
const app = express()

const productsRoutes = require('./routes/products')
const cartsRoutes = require('./routes/carts')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes); 

const PORT = 8080
app.listen(PORT, () => {
    console.log('running server in port 8080')
})

