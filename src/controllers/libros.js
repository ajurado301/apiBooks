// Conexión codenotchBBDD
const { appbooksBBDD } = require('../bbdd');

// Controladores endpoint /libros
// GET
const getLibro = (req, res) => {
    let id = req.query.id;
    let params = [];
    let sql;
    if (!id) {
        sql = "SELECT * FROM libro ORDER BY titulo";
    }else {
        params.push(id)
        sql = "SELECT * FROM libro WHERE id_libro = ?";
    };
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.length == 0){
                respuesta = { ok: false, message: `Libro con id ${id} no encontrado` };
            }else if (result.length == 1){
                respuesta = { ok: true, message: `Libro con id ${id}`, resultado: result};                
            }else {
                respuesta = { ok: true, message: `Listado libros`, resultado: result};                
            }
            return res.status(200).json(respuesta);
        }else {
            let respuesta = { ok: false, message: error.sqlMessage };
            return res.status(400).json(respuesta);
        }
    })
};

// POST
const postLibro = (req, res) => {
    const { titulo, tipo, autor, precio, foto } = req.body;
    let params = [titulo, tipo, autor, precio, foto];
    let sql = 'INSERT INTO libro (titulo, tipo, autor, precio, foto) VALUES (?, ?, ?, ?, ?)';
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta = { ok: true, message: `Registrado libro con id ${result.insertId}`, resultado: result.insertId };
            return res.status(200).json(respuesta);
        } else {
            let respuesta = { ok: false, message: error.sqlMessage };
            return res.status(400).json(respuesta);
        }
    })    
};

// PUT
const putLibro = (req, res) => {
    const { titulo, tipo, autor, precio, foto, id_libro } = req.body;
    let params = [titulo, tipo, autor, precio, foto, id_libro];
    let sql = "UPDATE libro SET titulo = COALESCE(?, titulo)," +
              "tipo = COALESCE(?, tipo), autor = COALESCE(?, autor)," +
              "precio = COALESCE(?, precio), foto = COALESCE(?, foto) WHERE id_libro = ?";
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Libro con id ${req.body.id_libro} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Libro con id ${req.body.id_libro} modificado`};
            }
            return res.status(200).json(respuesta);
        }else {
            let respuesta = { ok: false, message: error.sqlMessage };
            return res.status(400).json(respuesta);
        }
    })
};

// DELETE
const deleteLibro = (req, res) => {
     let params = [req.body.id_libro];
     let sql = "DELETE FROM libro WHERE id_libro = ?";
    appbooksBBDD.query(sql, params, (error, result) => {
        if (!error) {
            let respuesta;
            if (result.affectedRows == 0){
                respuesta = { ok: false, message: `Libro con id ${req.body.id_libro} no encontrado`};
            }else {
                respuesta = { ok: true, message: `Libro con id ${req.body.id_libro} eliminado`};
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
    getLibro,
    postLibro,
    putLibro,
    deleteLibro
}