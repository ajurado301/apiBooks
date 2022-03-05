// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { getLibro, postLibro, putLibro, deleteLibro } = require('../controllers/libros')

// Crear los endpoints para la ruta /profesores y atenderlos mediante sus controladores
router.get('/', getLibro);
router.post('/', postLibro);
router.put('/', putLibro);
router.delete('/', deleteLibro);

// Exportar router
module.exports = router;