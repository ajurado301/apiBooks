// Puerto express
const puertoExpress = 3000
// Importaciones
const express = require('express');
const cors = require('cors');

// Express
const app = express();

// Middlewares para cors y y mapeo de json
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Poner express API REST a la escucha
app.listen(puertoExpress, () => {
    console.log(`Servidor express corriendo en el puerto ${puertoExpress}`);
});

// Exportar app express
module.exports = app;
