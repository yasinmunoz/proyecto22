const fs = require ("fs");
const express = require('express');

const app = express();
const modelo = require("./servidor/model.js");
const { response } = require("express");

// Start de server
const PORT = process.env.PORT || 3000;

let juego = new modelo.Juego();

app.get('/', (req, res) => {
    res
        .status(200)
        .send("Hola")
        .end();
});

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/agregarUsuario/:nick", function(req, res){
    let nick = req.params.nick;    
    
    let response;
    response = juego.agregarUsuario( nick );
    
    res.send( response );
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

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}.`);
    console.log('Ctrl+C para salir.');
});