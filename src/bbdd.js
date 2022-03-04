// Importaciones
const mysql = require('mysql2');

const cadenaConexion = {
    host: 'localhost',
    user: 'root',
    password: 'Codenotch#2022',
    database: 'appbooks'
}
// Crear Conexión y conectar con BBDD codenotch mysql
const appbooksBBDD = mysql.createConnection(cadenaConexion);

appbooksBBDD.connect((error) => {
    if (!error) {
        console.log('Conectado a BBDD appbooks')
    }else {
        console.log(error);
    }
});

module.exports = {
    appbooksBBDD
}