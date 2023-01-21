var mongo = require("mongodb").MongoClient;

function Cad() {

    this.logs;

    this.insertarLog = function (registroLog, callback) {

        insertar(this.logs, registroLog, callback);
    };


    this.obtenerLogs = function (callback) {

        obtenerTodos(this.logs, callback);
    };


    function insertar(coleccion, elemento, callback) {

        coleccion.insertOne(elemento, function (err, res) {

            if (err) {
                console.log("error");
            }
            else {
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });
    };


    function obtenerTodos(coleccion, callback) {

        coleccion.find().toArray(function (error, col) {
            callback(col);
        });
    };


    this.conectar = function () {

        let cad = this;
        let uri = "mongodb+srv://yasin:batalla@cluster0.panqevb.mongodb.net/?retryWrites=true&w=majority";

        mongo.connect(uri, { useUnifiedTopology: true }, function (err, database) {

            if (!err) {
                console.log("Conectado a MongoDB Atlas");
                database.db("batalla").collection("logs", function (err, col) {
                    if (err) {
                        console.log("No se puede obtener la coleccion");
                    }
                    else {
                        console.log("Tenemos la colección de logs");
                        cad.logs = col;
                    }
                });

            }
            else {
                console.log("No se puedo conectar con MongoDB Atlas");
            }
        })
    };

}

module.exports.Cad = Cad;