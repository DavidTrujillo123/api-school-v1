const {Router} = require('express');

const {tokenRequiered} = require('../jwt/token');

const {
  courseCreate,
  courseUpdate,
  courseDelete,
  courseAddStudents,
  courseReadById,
  courseAttendanceReadById
} = require('../controllers/course.controller');

const router = Router();

router.get('/course/attendances/read/:co_id', courseAttendanceReadById);
router.get('/course/read/:co_id', courseReadById);
router.post('/course/create', courseCreate);
router.put('/course/update', courseUpdate);
router.delete('/course/delete/:co_id', courseDelete);
router.post('/course/addStudents', courseAddStudents);

module.exports = router;