const modelo = require("./modelo.js");

// Tablero de 10 x 10
const TABLERO_SIZE = 10

describe("Caso de prueba unitarias de Battleship Pro en fase desplegando: ", function () {

    let miJuego;
    let us1, us2, partida;
    let b1us1, b2us1, b3us1, b4us1;
    let b1us2, b2us2, b3us2, b4us2;

    beforeEach(function () {

        miJuego = new modelo.Juego(true);

        // Inicio de sesión de 2 usuarios
        miJuego.agregarUsuario("pepe");
        miJuego.agregarUsuario("luis");

        // Pepe crea una partida
        let res = miJuego.jugadorCreaPartida("pepe");

        // Luis se une a la partida creada por pepe
        miJuego.jugadorSeUneAPartida("luis", res.codigo);

        // Obtenemos los usuarios del juego
        us1 = miJuego.obtenerUsuario("pepe");
        us2 = miJuego.obtenerUsuario("luis");

        // Obtenemos la partida
        partida = miJuego.obtenerPartida(res.codigo);
    });


    it("Nicks de los jugadores", function () {

        // Tenemos dos jugadores: uno pepe y otro luis
        expect(us1.nick).toEqual("pepe");
        expect(us2.nick).toEqual("luis");
    });


    it("Tablero de los jugadores", function () {

        //Los jugadores tienen su tablero propios
        expect(us1.tableroPropio).toBeDefined();
        expect(us2.tableroPropio).toBeDefined();

        //Los jugadores tienen un tablero rival
        expect(us1.tableroRival).toBeDefined();
        expect(us2.tableroRival).toBeDefined();

        //El tablero propio de los jugadores es de 10x10
        expect(us1.tableroPropio.casillas.length).toEqual(TABLERO_SIZE);
        expect(us2.tableroPropio.casillas.length).toEqual(TABLERO_SIZE);

        //El tablero rival de los jugadores es de 10x10
        expect(us1.tableroRival.casillas.length).toEqual(TABLERO_SIZE);
        expect(us2.tableroRival.casillas.length).toEqual(TABLERO_SIZE);

        //Las casillas son agua antes de poner los barcos
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                expect(us1.tableroPropio.casillas[i][j].contiene.nombre).toEqual("agua");
            }
        }
    });


    it("Flota de los jugadores", function () {

        //Los jugadores tienen su flota
        expect(us1.flota).toBeDefined();
        expect(us2.flota).toBeDefined();

        // La flota de los jugadores está compuesta por 4 barcos
        expect(Object.keys(us1.flota).length).toEqual(4);
        expect(Object.keys(us2.flota).length).toEqual(4);

        // El tamaño de los barcos va del 1 al 4
        expect(us1.flota["b1"].tam).toEqual(1);
        expect(us1.flota["b2"].tam).toEqual(2);
        expect(us1.flota["b3"].tam).toEqual(3);
        expect(us1.flota["b4"].tam).toEqual(4);
    });

    it("Fase desplegando de la partida", function () {

        //Antes de empezar a jugar, la partida está en fase desplegando
        expect(partida.esDesplegando()).toEqual(true);
        expect(partida.esJugando()).toEqual(false);
        expect(partida.esFinal()).toEqual(false);
    });

    it("Barcos fuera de los límites del tablero", function () {

        // Pepe despliega 3 de sus barcos fuera del límite del tablero        
        us1.colocarBarco("b2", 9, 9); // (10,10)
        us1.colocarBarco("b3", 8, 8); // (9,9)
        us1.colocarBarco("b4", 7, 7); // (8,8)
        us1.barcosDesplegados();

        // Luis despliega 3 de sus barcos fuera del límite del tablero        
        us2.colocarBarco("b2", 9, 0); // (10,1)
        us2.colocarBarco("b3", 9, 1); // (10,2)
        us2.colocarBarco("b4", 9, 3); // (10,3)
        us2.barcosDesplegados();

        // No se colocan los 3 barcos de pepe
        expect(us1.tableroPropio.casillas[9][9].contiene.nombre).toEqual("agua");
        expect(us1.tableroPropio.casillas[8][8].contiene.nombre).toEqual("agua");
        expect(us1.tableroPropio.casillas[7][7].contiene.nombre).toEqual("agua");

        // No se colocan los 3 barcos de luis
        expect(us2.tableroPropio.casillas[9][0].contiene.nombre).toEqual("agua");
        expect(us2.tableroPropio.casillas[9][1].contiene.nombre).toEqual("agua");
        expect(us2.tableroPropio.casillas[9][3].contiene.nombre).toEqual("agua");
    });


    it("Barcos dentro de los límites del tablero", function () {

        // Pepe despliega 4 de sus barcos dentro del límite del tablero        
        us1.colocarBarco("b1", 1, 1); // (2,2)
        us1.colocarBarco("b2", 2, 3); // (3,4)
        us1.colocarBarco("b3", 5, 8); // (6,9)
        us1.colocarBarco("b4", 4, 2); // (5,3)
        us1.barcosDesplegados();

        // Luis despliega 4 de sus barcos fuera del límite del tablero    
        us2.colocarBarco("b1", 0, 3); // (1,4)    
        us2.colocarBarco("b2", 0, 0); // (1,1)
        us2.colocarBarco("b3", 0, 1); // (1,2)
        us2.colocarBarco("b4", 0, 2); // (1,3)
        us2.barcosDesplegados();

        // Obtenemos los barcos de pepe
        b1us1 = us1.obtenerBarcoDesplegado("b1");
        b2us1 = us1.obtenerBarcoDesplegado("b2");
        b3us1 = us1.obtenerBarcoDesplegado("b3");
        b4us1 = us1.obtenerBarcoDesplegado("b4");

        // Obtenemos los barcos de luis
        b1us2 = us2.obtenerBarcoDesplegado("b1");
        b2us2 = us2.obtenerBarcoDesplegado("b2");
        b3us2 = us2.obtenerBarcoDesplegado("b3");
        b4us2 = us2.obtenerBarcoDesplegado("b4");

        // Comprobamos que los 4 barcos de pepe están en el tablero
        expect(us1.tableroPropio.casillas[1][1].contiene).toEqual(b1us1);
        expect(us1.tableroPropio.casillas[2][3].contiene).toEqual(b2us1);
        expect(us1.tableroPropio.casillas[5][8].contiene).toEqual(b3us1);
        expect(us1.tableroPropio.casillas[4][2].contiene).toEqual(b4us1);

        // Comprobamos que los 4 barcos de luis están en el tablero
        expect(us2.tableroPropio.casillas[0][3].contiene).toEqual(b1us2);
        expect(us2.tableroPropio.casillas[0][0].contiene).toEqual(b2us2);
        expect(us2.tableroPropio.casillas[0][1].contiene).toEqual(b3us2);
        expect(us2.tableroPropio.casillas[0][2].contiene).toEqual(b4us2);
    });


    describe("Caso de prueba unitarias de Battleship Pro en fase jugando y terminado: ", function () {

        beforeEach(function () {

            // Pepe despliega 4 de sus barcos dentro del límite del tablero        
            us1.colocarBarco("b1", 1, 1); // (2,2)
            us1.colocarBarco("b2", 2, 3); // (3,4)
            us1.colocarBarco("b3", 5, 8); // (6,9)
            us1.colocarBarco("b4", 4, 2); // (5,3)
            us1.barcosDesplegados();

            // Luis despliega 4 de sus barcos fuera del límite del tablero    
            us2.colocarBarco("b1", 0, 3); // (1,4)    
            us2.colocarBarco("b2", 0, 0); // (1,1)
            us2.colocarBarco("b3", 0, 1); // (1,2)
            us2.colocarBarco("b4", 0, 2); // (1,3)
            us2.barcosDesplegados();
        });

        it("Barcos desplegados correctamente en sus casillas", function () {

            //Barcos desplegados de Pepe
            b1us1 = us1.obtenerBarcoDesplegado("b1");
            b2us1 = us1.obtenerBarcoDesplegado("b2");
            b3us1 = us1.obtenerBarcoDesplegado("b3");
            b4us1 = us1.obtenerBarcoDesplegado("b4");

            //Barcos desplegados de Luis
            b1us2 = us2.obtenerBarcoDesplegado("b1");
            b2us2 = us2.obtenerBarcoDesplegado("b2");
            b3us2 = us2.obtenerBarcoDesplegado("b3");
            b4us2 = us2.obtenerBarcoDesplegado("b4");


            // Comprobamos que los 4 barcos de pepe están desplegados en su casilla
            expect(us1.tableroPropio.casillas[1][1].contiene).toEqual(b1us1);
            expect(us1.tableroPropio.casillas[2][3].contiene).toEqual(b2us1);
            expect(us1.tableroPropio.casillas[5][8].contiene).toEqual(b3us1);
            expect(us1.tableroPropio.casillas[4][2].contiene).toEqual(b4us1);

            // Comprobamos que los 4 barcos de luis están desplegados en su casilla
            expect(us2.tableroPropio.casillas[0][3].contiene).toEqual(b1us2);
            expect(us2.tableroPropio.casillas[0][0].contiene).toEqual(b2us2);
            expect(us2.tableroPropio.casillas[0][1].contiene).toEqual(b3us2);
            expect(us2.tableroPropio.casillas[0][2].contiene).toEqual(b4us2);

        });

        it("Flotas de los jugadores desplegadas", function () {
            expect(us1.todosDesplegados()).toEqual(true);
            expect(us2.todosDesplegados()).toEqual(true);
        });

        it("Pepe gana la partida", function () {

            // Barcos de luis inicialmente en estado intacto
            expect(us2.flota["b1"].obtenerEstado()).toEqual("intacto");
            expect(us2.flota["b2"].obtenerEstado()).toEqual("intacto");
            expect(us2.flota["b3"].obtenerEstado()).toEqual("intacto");
            expect(us2.flota["b4"].obtenerEstado()).toEqual("intacto");

            // Pepe dispara al B4
            us1.disparar(0, 2);

            // Estado del B4 es tocado
            expect(us2.flota["b4"].obtenerEstado()).toEqual("tocado");

            // Pepe dispara al B1
            us1.disparar(0, 3);

            // Estado del B1 es hundido
            expect(us2.flota["b1"].obtenerEstado()).toEqual("hundido");

            // Estado del B2 y B3 es intacto
            expect(us2.flota["b2"].obtenerEstado()).toEqual("intacto");
            expect(us2.flota["b3"].obtenerEstado()).toEqual("intacto");

            // Pepe dispara al B4
            us1.disparar(1, 2);
            us1.disparar(2, 2);
            us1.disparar(3, 2);

            // Pepe dispara al B3
            us1.disparar(0, 1);
            us1.disparar(1, 1);
            us1.disparar(2, 1);

            // Luis dispara al B2
            us1.disparar(0, 0);
            us1.disparar(1, 0);

            // Estado de B2, B3 y B4 es hundido
            expect(us2.flota["b2"].obtenerEstado()).toEqual("hundido");
            expect(us2.flota["b3"].obtenerEstado()).toEqual("hundido");
            expect(us2.flota["b4"].obtenerEstado()).toEqual("hundido");

            // La flota de Luis está hundida 
            expect(us2.flotaHundida()).toEqual(true);

            // La flota de pepe no está hundida
            expect(us1.flotaHundida()).toEqual(false);

            // La partida ha terminado            
            expect(partida.esFinal()).toEqual(true);
        });
        
    });
});