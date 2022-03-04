// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { postUsuario } = require('../controllers/registro')

// Crear los endpoints para la ruta /alumnos y atenderlos mediante sus controladores
router.post('/', postUsuario);

// Exportar router
module.exports = router;