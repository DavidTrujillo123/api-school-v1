const {Router} = require('express');

const { tokenRequiered } = require('../jwt/token');
const {
  attendanceCreate,
  attendanceIsPresent,
  attendanceUpdate,
  attendanceReadDates,
  attendanceReadStudents,
  attendanceRead
} = require('../controllers/attendance.controller');

const router = Router();

router.get('/attendances/read/:co_id', tokenRequiered, attendanceRead);
router.get('/attendance/read/date/:co_id', tokenRequiered, attendanceReadDates);
router.get('/attendance/read/students/:at_id', tokenRequiered, attendanceReadStudents);
router.post('/attendance/create', tokenRequiered, attendanceCreate);
router.post('/attendance/update', tokenRequiered, attendanceUpdate);
router.post('/attendance/isPresent', tokenRequiered, attendanceIsPresent);

module.exports = router;