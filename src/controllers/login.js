// Conexión codenotchBBDD
const { appbooksBBDD } = require('../bbdd');

// Controlador endpoint /login
// POST
const appLogin = (req, res) => {
    const { correo, password } = req.body;
    let params = [correo, password];
    let sql = 'SELECT * FROM usuario WHERE (correo = ?) && (password = ?)';
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: false, message: `Usuario o contraseña incorrectos` };                
            if (result.length > 0) {
                const { id_usuario, nombre, apellidos, correo, url } = result[0]
                let usuario = {  id_usuario, nombre, apellidos, correo, url };
                respuesta = { ok: true, message: `Login correcto`, resultado: usuario };
            }
            return res.status(200).json(respuesta);
        } else {
            let respuesta = { ok: false, message: error.sqlMessage };
            return res.status(400).json(respuesta);
        }
    })
};

// Exportar controladores
module.exports = {
    appLogin
}