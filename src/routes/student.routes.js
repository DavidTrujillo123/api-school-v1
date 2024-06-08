const {Router} = require('express');

const {tokenRequiered} = require('../jwt/token');

const {
  studentReadById,
  studentCreate,
  studentUpdate,
  studentDelete,
} = require('../controllers/student.controller')

const router = Router();

router.get('/student/read/:st_id', studentReadById);
router.post('/student/create', tokenRequiered, studentCreate);
router.put('/student/update', studentUpdate);
router.delete('/student/delete/:st_id', studentDelete);

module.exports = router;