// File System
const fs = require("fs");

// Express
const express = require('express');
const app = express();

// Socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Passport
const passport = require("passport");
require("./server/passport-setup.js");

// cookie-session
const cookieSession = require("cookie-session");

const modelo = require("./server/modelo.js");
const sWS = require("./server/servidorWS.js");

let args = process.argv.slice(2);
let juego = new modelo.Juego(args[0]);
let servidorWS = new sWS.ServidorWS();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));

app.use(cookieSession(
    {
        name: 'Batalla Naval',
        keys: ['key1', 'key2']
    }
));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", function (request, response) {
    let contenido = fs.readFileSync(__dirname + "/client/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fallo' }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
});

app.get("/good", function (request, response) {
    let nick = request.user.emails[0].value;
    if (nick) {
        juego.agregarUsuario(nick);
    }
    response.cookie('nick', nick);
    response.redirect('/');
});

app.get("/fallo", function (request, response) {
    response.send({ nick: "no ok" });
});

app.get("/agregarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let res;
    res = juego.agregarUsuario(nick);
    response.send(res);
});

app.get("/comprobarUsuario/:nick", function (request, response) {
    let nick = request.params.nick;
    let us = juego.obtenerUsuario(nick);
    let res = { "nick": -1 };
    if (us) {
        res.nick = us.nick;
    }
    response.send(res);
});

app.get("/crearPartida/:nick", function (request, response) {
    let nick = request.params.nick;
    let res = juego.jugadorCreaPartida(nick);

    response.send(res);
});

app.get("/unirseAPartida/:nick/:codigo", function (request, response) {
    let nick = request.params.nick;
    let codigo = request.params.codigo;
    let res = juego.jugadorSeUneAPartida(nick, codigo)
    response.send(res);
});

app.get("/obtenerPartidas", function (request, response) {
    let lista = juego.obtenerPartidas();
    response.send(lista);
});

app.get("/obtenerPartidasDisponibles", function (request, response) {
    let lista = juego.obtenerPartidasDisponibles();
    response.send(lista);
});

app.get("/salir/:nick", function (request, response) {
    let nick = request.params.nick;
    cod = juego.usuarioSale(nick);
    response.send({ res: "ok", codigo: cod });
});

app.get("/obtenerLogs", function (request, response) {
    juego.obtenerLogs(function (logs) {
        response.send(logs);
    });
});

server.listen(PORT, () => {
    console.log(`App escuchando en el puerto ${PORT}`);
    console.log('Press Ctrl+C para salir.');
});

//lanzar servidor
servidorWS.lanzarServidorWS(io, juego);