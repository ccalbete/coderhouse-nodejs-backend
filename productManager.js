class ProductManager {
  constructor() {
    this.products = [];
    }

  addProduct(productToAdd){
      let canBeAdded = true
      let errorMessage = ""
      if(!productToAdd.title || !productToAdd.description || !productToAdd.price || !productToAdd.thumbnail ||
         !productToAdd.code || !productToAdd.stock){
          canBeAdded = false
          errorMessage = "Mandatory fields are missing"
      } else {
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === productToAdd.code){
                canBeAdded = false
                errorMessage = "Code already exists"
                break
            }
           }
      }        
      if(canBeAdded){
        if (this.products.length === 0) {
            productToAdd.id = 1;
          } else {
            productToAdd.id = this.products[this.products.length - 1].id + 1;
          }
          this.products.push(productToAdd)
        console.log("Product successfully added")
      } else {
         console.log(errorMessage)
      }
  }
  
  getProducts(){
      return this.products
  }

  getProductById(id){
      let productFound = false
      for(let i = 0; i < this.products.length; i++){
          if(this.products[i].id === id) {
            console.log(this.products[i])
            productFound = true
          }
          break
      }
      if(!productFound){
          console.log("Not found")
      }
  }
}


// pruebas

const productManager = new ProductManager()
console.log(productManager.getProducts())
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
console.log(productManager.getProducts())
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
console.log(productManager.getProducts())

productManager.getProductById(1)
productManager.getProductById(6)