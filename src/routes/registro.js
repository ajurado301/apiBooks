// Importar Router
const { Router } = require('express');
const router = Router();

// Importar controladores
const { postUsuario, putUsuario } = require('../controllers/registro')

// Crear los endpoints para la ruta /alumnos y atenderlos mediante sus controladores
router.post('/', postUsuario);
router.put('/', putUsuario);

// Exportar router
module.exports = router;