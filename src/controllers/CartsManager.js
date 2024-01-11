const { FORMERR } = require('dns');
const fs = require('fs')
class CartsManager{
    constructor(path) {
        this.path = './carts.json';
        if (!fs.existsSync(this.path)) {
          fs.writeFileSync(this.path, '[]');
        }
    }

    getCarts(){
        return  JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    }

 async addCart(products){
    let canBeAdded = true
    let currentCarts = await this.getCarts()
    try{
        if(products){
            let id = 1
            if (currentCarts.length !== 0) id = currentCarts[currentCarts.length - 1].id + 1;
            currentCarts.push({id: id, products: []})
            fs.writeFileSync(this.path, JSON.stringify(currentCarts, null, 2))
        } else {
            canBeAdded = false
        }
      return canBeAdded
    }catch(error){
      throw new Error(error)
    }
  }

 //solo funciona encapsulando todo el carts.json en un array [] y despues de correr una vez con los corchetes, se borran los corchetes
  async addProductToACart(cartId, productId){
      const cart = await this.getCartById(cartId)
      let productFound = false
      if(!cart){
         return console.error('Cart not found')
      } else {
          if(cart.products.length){
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].id == productId) {
                cart.products[i].quantity++ 
                productFound = cart.products[i]
                break
            }
        }}else if(!productFound){
            cart.products.push([{product: productId, quantity: 1}])
        }
        }
        fs.writeFileSync(this.path, JSON.stringify(cart, null, 2));
}
  async getCartById(id){
    let cartFound = false
    const carts = await this.getCarts()
    for(let i = 0; i < carts.length; i++){
        if(carts[i].id === id) {
          cartFound = carts[i]
          break
        }
    }
    return cartFound
  }
}
module.exports = CartsManager;