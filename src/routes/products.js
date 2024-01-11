const express = require("express"); 
const router = express.Router(); 

const ProductManager = require('../controllers/ProductManager')

const productManager = new ProductManager('../products.json')

router.get('/', async(req, res) => {
    let products = await productManager.getProducts()
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    products =  products.slice(0, limit);
    return res.send(products)
})
router.get('/:pid', async(req, res) => {
    const productId = parseInt(req.params.pid)
    const product = await productManager.getProductById(productId)
    if(product){
      return  res.send(product)
    }else {
       return res.status(404).send({status:"error", message: "Not found"});
    }    
})

router.post('/', async(req, res) => {
    try{
        const { title, description, code, price, status=true, stock, category, thumbnails } = req.body;
        const created =  await productManager.addProduct( { title, description, code, price, status, stock, category, thumbnails })
        if(created){
            res.status(201).send() 
        } else{
            return res.status(400).json({ success: false, message: "Required data is missing (title, description, code, price, status, stock, category)" });
        }
    } catch(error){
        return next(error);
    }
})

router.put('/:pid', async(req, res) => {
    try{
        const id = parseInt(req.params.pid)
        const productAttributes = req.body
        const updated = await productManager.updateProduct(id, productAttributes)
        if(updated){
            res.status(200).send()
        } else {
            return res.status(400).json({ success: false, message: "Product not found" });
        }
} catch(error){
    return next(error);
}
})

router.delete('/:pid', async(req, res) => {
    try{
        const id = parseInt(req.params.pid)
        const deleted = await productManager.deleteProduct(id)
        if(deleted){
            res.status(200).send()
        } else {
            return res.status(400).json({ success: false, message: "Product not found" });
        }
} catch(error){
    return next(error);
}
})


module.exports = router;