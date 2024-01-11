const fs = require('fs')
class ProductManager {
  constructor(path) {
    this.path = './products.json';
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
    }

  addProduct(productToAdd){
    try{
      let canBeAdded = true
      let errorMessage = ""
      let currentProducts =  this.getProducts()
      if(!productToAdd.title || !productToAdd.description || !productToAdd.price ||
         !productToAdd.code  || !productToAdd.stock || !productToAdd.category){
          canBeAdded = false
          errorMessage = "Mandatory fields are missing"
      } else {
        for (let i = 0; i < currentProducts.length; i++) {
            if(currentProducts[i].code === productToAdd.code){
                canBeAdded = false
                errorMessage = "Code already exists"
                break
            }
           }
      }        
      if(canBeAdded){
        if (currentProducts.length === 0) {
            productToAdd.id = 1;
          } else {
            productToAdd.id = currentProducts[currentProducts.length - 1].id + 1;
          }
         currentProducts.push(productToAdd)
         fs.writeFileSync(this.path, JSON.stringify(currentProducts, null, 2))
      } 
      return canBeAdded
    }catch(error){
      throw new Error(error)
    }
  }
  
  getProducts(){
      return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
  }

  getProductById(id){
      let productFound = false
      const products = this.getProducts()
      for(let i = 0; i < products.length; i++){
          if(products[i].id === id) {
            productFound = products[i]
            break
          }
      }
      return productFound
  }

  //seguro hay una manera mas eficiente de hacer estas validaciones pero no se me ocurrio
  updateProduct(productId, productAttributes){
    let productUpdated = false
   let products = this.getProducts()
   for(let i=0; i < products.length; i++){
    if(products[i].id === productId) {
     if(productAttributes.title){
       products[i].title = productAttributes.title
     }
     if(productAttributes.description){
       products[i].description = productAttributes.description
     }
     if(productAttributes.code){
       products[i].code = productAttributes.code
     }
     if(productAttributes.status){
       products[i].status = productAttributes.status
     }
     if(productAttributes.price){
       products[i].price = productAttributes.price
     }
     if(productAttributes.thumbnail){
       products[i].thumbnail = productAttributes.thumbnail
     }
     if(productAttributes.stock){
       products[i].stock = productAttributes.stock
     }
     if(productAttributes.category){
       products[i].category = productAttributes.category
     }
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
      productUpdated = true
      break
    }
   }
   return productUpdated
  }

  deleteProduct(id){
    let productDeleted = false
    let products = this.getProducts()
    for(let i=0; i < products.length; i++){
    if(products[i].id === id) {
      // delete product on index i
      products.splice(i, 1)
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
      productDeleted = true
      break
    }
  }
  return productDeleted
  }
} 
module.exports = ProductManager;
