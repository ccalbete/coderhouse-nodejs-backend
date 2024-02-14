const express = require('express')
const app = express()
const socket = require("socket.io");

const mongoose = require('mongoose');

const productsRoutes = require('./routes/products')
const cartsRoutes = require('./routes/carts')
const usersRoutes = require('./routes/users')

const exphbs = require('express-handlebars')
const path = require('path')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes); 
app.use('api/users', usersRoutes)
app.use('/realtime', function ejemplo(req, res){
    res.render('index')
})

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log('running server in port 8080')
})

mongoose.connect('mongodb+srv://ccalbete10:coderhouse@coderhousecluster.wy4vbrw.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); 
  });
  
  db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
  });
const io = socket(httpServer);

io.on("connection", (socket) => {
    console.log("Un cliente se conecto");

    socket.on("mensaje", (data) => {
        console.log(data);
        io.sockets.emit("mensaje", data);
    })
    
    socket.emit("saludito", "Hola cliente, ¿cómo estas?");
})
