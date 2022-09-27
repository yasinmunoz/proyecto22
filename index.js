const fs = require ("fs");
const express = require('express');

const app = express();

// HTTP GET POST PUT DELETE

/*

"/"
"/obtenerPartidas"
"/agregarUsuario/:nick"

*/

app.get('/', (req, res) => {
    res
        .status(200)
        .send("Hola")
        .end();
});

// Start de server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}.`);
    console.log('Ctrl+C para salir.');
});