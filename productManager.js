const fs = require('fs')
class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, '[]');
    }
    }

  addProduct(productToAdd){
      let canBeAdded = true
      let errorMessage = ""
      let currentProducts =  this.getProducts()
      if(!productToAdd.title || !productToAdd.description || !productToAdd.price || !productToAdd.thumbnail ||
         !productToAdd.code || !productToAdd.stock){
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
        console.log("Product successfully added")
      } else {
         console.log(errorMessage)
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
            console.log(products[i])
            productFound = true
            break
          }
      }
      if(!productFound){
          console.log("Not found")
      }
  }

  updateProduct(productId, productAttributes){
    let productFound = false
   let products = this.getProducts()
   for(let i=0; i < products.length; i++){
    if(products[i].id === productId) {
      productAttributes.id = productId
      products[i] = productAttributes
      productFound = true
      break
    }
   }
   if(productFound){
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
    console.log(`Product ${productId} successfully updated`)
}else{
  console.log("Not found")
}
  }

  deleteProduct(id){
    let productFound = false
    let products = this.getProducts()
    for(let i=0; i < products.length; i++){
    if(products[i].id === id) {
      // delete product on index i
      products.splice(i, 1)
      productFound = true
      break
    }
  }
  if(productFound){
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
    console.log(`Product successfully deleted`)
  } else {
    console.log("Not found")
  }
    
  }
}


// pruebas

console.log('create the productManager class instance with the path ./products.json')
const productManager = new ProductManager('./products.json')

console.log('\nget the empty product array') 
console.log(productManager.getProducts())

console.log('\nadd a product') 
productManager.addProduct(
    {
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    }
)

console.log('\nshow the product added')
console.log(productManager.getProducts())

console.log('\nadd another product')
productManager.addProduct(
    {
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc1234",
        stock: 28
    }
)
console.log('\nshow all products')
console.log(productManager.getProducts())

console.log('\nget product with id 1')
productManager.getProductById(1)

console.log('\nget product with id 6')
productManager.getProductById(6)

console.log('\nupdate description for product 1')
productManager.updateProduct(1, {
  title: 'producto prueba',
  description: 'Esta es una nueva descripcion',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 25
})
console.log('\nshow product updated')
productManager.getProductById(2)

console.log('\ndelete the product with id 2')
productManager.deleteProduct(2)
console.log('show all products')
console.log(productManager.getProducts())

console.log('\ndelete product with id 6')
productManager.deleteProduct(6)