const {Router} = require('express');

const {
  attendanceCreate,
  attendanceIsPresent,
  attendanceUpdate,
  attendanceReadDates,
  attendanceReadStudents
} = require('../controllers/attendance.controller');

const router = Router();

router.get('/attendance/read/date/:co_id', attendanceReadDates);
router.get('/attendance/read/students/:at_id', attendanceReadStudents);
router.post('/attendance/create', attendanceCreate);
router.post('/attendance/update', attendanceUpdate);
router.post('/attendance/isPresent', attendanceIsPresent);

module.exports = router;