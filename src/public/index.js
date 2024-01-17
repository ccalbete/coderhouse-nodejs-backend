const socket = io(); 

socket.emit("mensaje", "Hola mundo!");

socket.on("saludito", (data) => {
    console.log(data);
})