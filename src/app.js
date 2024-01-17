const express = require('express')
const app = express()
const socket = require("socket.io");

const productsRoutes = require('./routes/products')
const cartsRoutes = require('./routes/carts')

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes); 

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log('running server in port 8080')
})
const io = socket(httpServer);

app.set('views', './public.views')
app.use(express.static('./public'))

io.on("connection", (socket) => {
    console.log("Un cliente se conecto");

    socket.on("mensaje", (data) => {
        console.log(data);
        io.sockets.emit("mensaje", data);
    })
    
    socket.emit("saludito", "Hola cliente, ¿cómo estas?");
})
