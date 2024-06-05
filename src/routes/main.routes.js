const {Router} = require('express');

const adminRoutes = require('./admin.routes');
const teacherRoutes = require('./teacher.routes');
const courseRoutes = require('./course.routes');
const studentRoutes = require('./student.routes');
const attendanceRoutes = require('./attendance.routes');
const authRoutes = require('./auth.routes');

const router = Router();

router.use(adminRoutes);
router.use(teacherRoutes);
router.use(courseRoutes);
router.use(studentRoutes);
router.use(attendanceRoutes);
router.use(authRoutes);

module.exports = router;