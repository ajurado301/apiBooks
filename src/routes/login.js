// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { appLogin } = require('../controllers/login')

// Crear los endpoints para la ruta /profesores y atenderlos mediante sus controladores
router.post('/', appLogin);

// Exportar router
module.exports = router;