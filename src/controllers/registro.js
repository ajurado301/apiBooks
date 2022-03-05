// Conexión codenotchBBDD
const { appbooksBBDD } = require('../bbdd');

// Controlador enpoint /registro
// POST
const postUsuario = (req, res) => {
    const { nombre, apellidos, correo, url, password } = req.body;
    let params = [nombre, apellidos, correo, url, password];
    let sql = 'INSERT INTO usuario (nombre, apellidos, correo, url, password) VALUES (?, ?, ?, ?, ?)';
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Registrado usuario con id ${result.insertId}`, resultado: result.insertId };
            return res.status(200).json(respuesta);
        } else {
            let respuesta = { ok: false, message: error.sqlMessage };
            return res.status(400).json(respuesta);
        }
    })    
};

// Exportar controladores
module.exports = {
    postUsuario
}