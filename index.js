const fs = require ("fs");
const express = require('express');
const app = express();
const modelo = require("./servidor/model.js");

// Start de server
const PORT = process.env.PORT || 3000;

let juego = new modelo.Juego();

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {

    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");

    res.setHeader("Content-type", "text/html");

    res.send(contenido);
});

app.get("/agregarUsuario/:nick", function(req, res){

    let nick = req.params.nick;    
    
    let response = juego.agregarUsuario( nick );
    
    res.send( response ); // conecta con clienteRest.
});

app.get("/crearPartida/:nick", function(req, res){

    let nick = req.params.nick;

    let response = juego.jugadorCreaPartida(nick); 

    res.send ( response );
});

app.get("/unirseAPartida/:nick/:codigo", function(req, res){
    
    let nick = req.params.nick;

    let codigo = req.params.codigo;
    
    let response = juego.jugadorSeUneAPartida(nick, codigo);

    res.send ( response );
});

app.get("/obtenerPartidas", function(req, res){    
   
    let response = juego.obtenerPartidas(); 

    res.send ( response );
});

app.get("/obtenerPartidasDisponibles", function(req, res){    
   
    let lista = juego.obtenerPartidasDisponibles(); 

    res.send ( response );
});

app.listen(PORT, () => {

    console.log(`App está escuchando en el puerto ${PORT}.`);
    console.log('Ctrl+C para salir.');
});