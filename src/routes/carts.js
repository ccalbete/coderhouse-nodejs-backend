const express = require("express"); 
const router = express.Router(); 
const CartsManager = require('../controllers/CartsManager')
const cartsManager = new CartsManager('./carts.json')

router.post('/', async(req, res) => {
    try{
        const created =  await cartsManager.addCart()
        if(created){
            res.status(201).send() 
        } else{
            // no se como hacer para que entre al else si el body esta vacio
            return res.status(400).json({ success: false, message: "Required data is missing (products)" });
        }
    } catch(error){
        return console.error(error);
    }
})

router.post('/:cid/product/:pid', async(req, res) => {
    try{
const added = await cartsManager.addProductToACart(parseInt(req.params.cid), parseInt(req.params.pid))
if (added){
    res.status(200).send()
} else {
    return res.status(400).json({ success: false, message: "Product not added" }); 
}
    }catch(error){
        console.error(error)
    }
})

router.get('/:cid', async(req, res) => {
    try{
        const id =  parseInt(req.params.cid)
        const cartFound = await cartsManager.getCartById(id)
        if(cartFound){
            return res.send(cartFound)
        } else {
            return  res.status(400).json({ success: false, message: "Cart not found" });
        }
    }catch(error){
        console.error(error)
    }
})


module.exports = router;