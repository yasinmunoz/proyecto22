const { response } = require("express");

function Juego() {

    this.partidas = {};
    this.usuarios = {}; //array asociativo

    this.agregarUsuario = function (nick) {
        let res = { nick: -1 };

        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick, this);
            res = { nick: nick };
            console.log("Nuevo usuario: " + nick);
        }

        return res;
    };

    this.eliminarUsuario = function (nick) {
        delete this.usuarios[nick];
    };

    this.jugadorCreaPartida = function (nick) {
        let usr = this.usuarios[nick]; 
        let response = { codigo: -1 };
        
        let codigo;
        if (usr) {
            codigo = usr.crearPartida();
            response = { codigo: codigo };
        }        
        return response;
    };

    this.jugadorSeUneAPartida = function(nick, codigo){
        let usr = this.usuarios[nick];
        let res = { "codigo": -1 };
        
        if (usr) {
            let valor = usr.unirseAPartida(codigo);
            res = { "codigo": valor };
            console.log("El usuario " + nick + " se une a la partida " + codigo);
        }

        return res;
    }

    this.crearPartida = function (usr) {
        let codigo = Date.now();
        this.partidas[codigo] = new Partida(codigo, usr);
        console.log("El usuario " + usr.nick + " ha creado la partida " + codigo);
        return codigo;
    }

    this.unirseAPartida = function (codigo, usr) {
        if (this.partidas[codigo]) {
            this.partidas[codigo].agregarJugador(usr);
        } else {
            console.log('La partida no existe.');
        }
    }

    this.obtenerPartidas = function () {
        let lista = [];

        for (let key in this.partidas) {
            lista.push({
                "codigo": key, 
                "owner": this.partidas[key].owner
            });
        }

        return lista;
    }

    this.obtenerPartidasDisponibles = function () {
        // devolver solo las partidas sin completar
    }
}

function Usuario(nick, juego) {

    this.nick = nick;
    this.juego = juego;

    this.crearPartida = function () {
        return this.juego.crearPartida(this);
    }

    this.unirseAPartida = function (codigo) {
        this.juego.unirseAPartida(codigo, this);
    }
}

function Partida(codigo, nick) {
    this.codigo = codigo;
    this.owner = nick;
    this.jugadores = []; 
    this.fase = "inicial"; // new Inicial()

    //this.maxJugadores=2
    this.agregarJugador = function (nick) {
        if (this.jugadores.length < 2) {
            this.jugadores.push(nick);
        } else {
            console.log('La partida está completa.');
        }
    }

    this.agregarJugador(this.owner);
}

module.exports.Juego = Juego;