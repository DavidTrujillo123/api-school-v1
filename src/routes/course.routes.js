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

router.get('/course/attendances/read/:co_id', tokenRequiered, courseAttendanceReadById);
router.get('/course/read/:co_id',tokenRequiered, courseReadById);
router.post('/course/create',tokenRequiered, courseCreate);
router.put('/course/update',tokenRequiered, courseUpdate);
router.delete('/course/delete/:co_id',tokenRequiered, courseDelete);
router.post('/course/addStudents',tokenRequiered, courseAddStudents);

module.exports = router;