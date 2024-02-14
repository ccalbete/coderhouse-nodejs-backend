const { FORMERR } = require('dns');
const fs = require('fs')
const path = require('path');
class CartsManager{
  constructor(path) {
  this.path = './carts.json'
  if (!fs.existsSync(this.path)) {
    fs.writeFileSync(this.path, '[]');
    }
  }

  getCarts(){
    return  JSON.parse(fs.readFileSync(this.path, 'utf-8'))
  }

 async addCart(){
    let currentCarts = await this.getCarts()
    let added = false
    try{
      if (currentCarts.length === 0) {
        currentCarts = [];
      }  
      let id = 1
      if (currentCarts.length !== 0) id = currentCarts[currentCarts.length - 1].id + 1;
      currentCarts.push({id: id, products: []})
      fs.writeFileSync(this.path, JSON.stringify(currentCarts, null, 2))
      added = true
      return added
    }catch(error){
      throw new Error(error)
    }
  }

 //solo funciona encapsulando todo el carts.json en un array [] y despues de correr una vez con los corchetes, se borran los corchetes
 async addProductToACart(cartId, productId) {
  const carts = await this.getCarts()
  const index = carts.findIndex((cart) => cart.id == cartId)
  let productFound = false

  if (index < 0) {
    return console.error('Cart not found')
  } else {
    if (carts[index].products.length) {
      for (let i = 0; i < carts[index].products.length; i++) {
        console.log("carts", carts[index].products)
        if (carts[index].products[i].product == productId) {
          carts[index].products[i].quantity++
          productFound = true
          break
        }
      }
    }
    if(!productFound) {
     carts[index].products.push({ product: productId, quantity: 1 })
   }
  }
  fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
  return !productFound
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