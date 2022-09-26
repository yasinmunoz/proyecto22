function Juego () {

    this.partidas = {};
    this.usuarios = {}; //array asociativo

    this.agregarUsuario = function (nick) {
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick, this);
        }
    };

    this.crearPartida = function (nick) {
        // obtener código
        // crear la partida con propietario nick
        // devolver el código
        console.log("Partida creada");
    }
}

function Usuario (nick, juego) {

    this.nick = nick;
    this.juego = juego;

    this.crearPartida = function () {
        this.juego.crearPartida(nick);
    }
}

function Partida () {

    this.codigo;
}