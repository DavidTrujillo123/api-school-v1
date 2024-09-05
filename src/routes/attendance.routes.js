const {Router} = require('express');

const { tokenRequiered } = require('../jwt/token');
const {
  attendanceCreate,
  attendanceIsPresent,
  attendanceUpdate,
  attendanceReadDates,
  attendanceStudentReadById
} = require('../controllers/attendance.controller');

const router = Router();

router.get('/attendance/read/date/:co_id', attendanceReadDates);
router.get('/attendance/read/students/:at_id', attendanceStudentReadById);
router.post('/attendance/create', attendanceCreate);
router.post('/attendance/update', attendanceUpdate);
router.post('/attendance/isPresent', attendanceIsPresent);

module.exports = router;