let modelo = require("./modelo.js");

const SIZE = 10

describe("El juego...", function () {
    var miJuego;
    var us1, us2, partida;

    beforeEach(function () {   //Se ejecuta antes de cada bloque it
        miJuego = new modelo.Juego(true);
        miJuego.agregarUsuario("pepe");
        miJuego.agregarUsuario("luis");
        let res = miJuego.jugadorCreaPartida("pepe");
        miJuego.jugadorSeUneAPartida("luis", res.codigo);
        us1 = miJuego.obtenerUsuario("pepe");
        us2 = miJuego.obtenerUsuario("luis");
        partida = miJuego.obtenerPartida(res.codigo);
    });

    it("inicialmente", function () {
        expect(us1.nick).toEqual("pepe");
        expect(us2.nick).toEqual("luis");
    });

});
