const cad = require('./cad');

function Juego(test) {

    this.partidas = {};
    this.usuarios = {}; //array asociativo
    this.cad = new cad.Cad();
    this.test = test;

    this.agregarUsuario = function (nick) {

        let res = { "nick": -1 };

        if (!this.usuarios[nick]) {

            this.usuarios[nick] = new Usuario(nick, this);

            this.insertarLog({ "operacion": "inicioSesion", "usuario": nick, "fecha": Date() }, function () {
                console.log("Registro de log(iniciar sesion) insertado");
            });

            res = { "nick": nick };
            console.log("Nuevo usuario: " + nick);
        }

        return res;
    };

    this.eliminarUsuario = function (nick) {

        delete this.usuarios[nick];
    };

    this.usuarioSale = function (nick) {

        if (this.usuarios[nick]) {
            codigo = this.finalizarPartida(nick);

            this.eliminarUsuario(nick);

            this.insertarLog({ "operacion": "finSesion", "usuario": nick, "fecha": Date() }, function () {
                console.log("Registro de log(salir) insertado");
            });

            if (codigo) {
                return codigo;
            }
        }
    };

    this.jugadorCreaPartida = function (nick) {

        let usr = this.usuarios[nick];
        let res = { codigo: -1 };

        if (usr) {
            let codigo = usr.crearPartida();
            res = { codigo: codigo };
        }

        return res;
    };

    this.jugadorSeUneAPartida = function (nick, codigo) {

        let usr = this.usuarios[nick];
        let res = { "codigo": -1 };

        if (usr) {
            let codigo = usr.crearPartida();
            res = { codigo: codigo };
        }

        return res;
    };

    this.obtenerUsuario = function (nick) {

        return this.usuarios[nick];
    };

    this.crearPartida = function (usr) {

        let codigo = Date.now();
        console.log("Usuario " + usr.nick + " crea partida " + codigo);

        this.insertarLog({ "operacion": "crearPartida", "propietario": usr.nick, "codigo": codigo, "fecha": Date() }, function () {
            console.log("Registro de log(crear partida) insertado");
        });

        this.partidas[codigo] = new Partida(codigo, usr);

        return codigo;
    };

    this.unirseAPartida = function (codigo, usr) {

        let res = -1;

        if (this.partidas[codigo]) {
            res = this.partidas[codigo].agregarJugador(usr);

            this.insertarLog({ "operacion": "unirsePartida", "usuario": usr.nick, "codigoPartida": codigo, "fecha": Date() }, function () {
                console.log("Registro de log(unirse a partida) insertado");
            });
        }
        else {
            console.log("La partida no existe");
        }

        return res;
    };

    this.obtenerPartidas = function () {

        let lista = [];

        for (let key in this.partidas) {
            lista.push({ "codigo": key, "owner": this.partidas[key].owner.nick });
        }

        return lista;
    };

    this.obtenerPartidasDisponibles = function () {

        let lista = [];

        for (let key in this.partidas) {
            if (this.partidas[key].fase == "inicial") {
                lista.push({ "codigo": key, "owner": this.partidas[key].owner.nick, "fase": this.partidas[key].fase });
            }
        }

        return lista;
    };

    this.finalizarPartida = function (nick) {

        let lista = [];

        for (let key in this.partidas) {
            if (this.partidas[key].fase == "inicial") {
                lista.push({ "codigo": key, "owner": this.partidas[key].owner.nick, "fase": this.partidas[key].fase });
            }
        }
        return lista;
    };

    this.obtenerPartida = function (codigo) {

        return this.partidas[codigo];
    };

    this.obtenerLogs = function (callback) {

        this.cad.obtenerLogs(callback);
    };

    this.insertarLog = function (log, callback) {

        if (this.test == 'false') {
            this.cad.insertarLog(log, callback)
        }
    };

    if (test == 'false') {
        this.cad.conectar(function (db) {
            console.log("Conectandose a Atlas")
        });
    }
};

function Usuario(nick, juego) {
    this.nick = nick;
    this.juego = juego;
    this.crearPartida = function () {
        return this.juego.crearPartida(this)
    }
    this.unirseAPartida = function (codigo) {
        return this.juego.unirseAPartida(codigo, this);
    }
}

function Partida(codigo, usr) {
    this.codigo = codigo;
    this.owner = usr;
    this.jugadores = [];
    this.fase = "inicial"; //new Inicial()
    this.maxJugadores = 2;
    this.agregarJugador = function (usr) {
        let res = this.codigo;
        if (this.hayHueco()) {
            this.jugadores.push(usr);
            console.log("El usuario " + usr.nick + " se une a la partida " + this.codigo);
            this.comprobarFase();
        }
        else {
            res = -1;
            console.log("La partida está completa")
        }
        return res;
    }
    this.comprobarFase = function () {
        if (!this.hayHueco()) {
            this.fase = "jugando";
        }
    }
    this.hayHueco = function () {
        return (this.jugadores.length < this.maxJugadores)
    }
    this.agregarJugador(this.owner);
}

module.exports.Juego = Juego;