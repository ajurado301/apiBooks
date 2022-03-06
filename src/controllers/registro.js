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

// PUT
const putUsuario = (req, res) => {
    const { nombre, apellidos, correo, url, password, id_usuario } = req.body;
    let pass = (password == '') ? null : password;
    let params = [nombre, apellidos, correo, url, pass, id_usuario];
    let sql = "UPDATE usuario SET nombre = COALESCE(?, nombre), apellidos = COALESCE(?, apellidos)," +
              "correo = COALESCE(?, correo), url = COALESCE(?, url)," +
              "password = COALESCE(?, password) WHERE id_usuario = ?";
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Usuario con id ${req.body.id_usuario} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Usuario con id ${req.body.id_usuario} modificado`};
            }
            return res.status(200).json(respuesta);
        }else {
            let respuesta = { ok: false, message: error.sqlMessage };
            return res.status(400).json(respuesta);
        }
    })
};

// Exportar controladores
module.exports = {
    postUsuario,
    putUsuario
}