const {Router} = require('express');
const {
  adminLogin,
  teacherLogin,
  verifyToken
} = require('../controllers/auth.controller');

const router = Router();

//Para que las cookies funcionen tienen que estar en la mismas rutas
router.get('/auth/isValidToken', verifyToken);
router.post('/auth/admin', adminLogin);
router.post('/auth/teacher', teacherLogin);

module.exports = router;