const {Router} = require('express');
const {verificationToken} = require('../jwt/token')

const {
  teacherLogin,
  teacherCreate,
  teacherUpdate,
  teacherStudents,
  teacherCourses,
  teacherCoursesStudents,
  teacherStudentsCourses,
  teacherDelete,
  teacherReadCookie,
  teacherVerificacionToken
} = require('../controllers/teacher.controller');

const router = Router();


router.get('/teacher/valid-token', teacherVerificacionToken);
router.get('/teacher/read', teacherReadCookie);
router.post('/teacher/login', teacherLogin);
//route, middleware, function
router.get('/teacher/students/:te_id', verificationToken, teacherStudents);
router.get('/teacher/students/courses/:te_id', verificationToken, teacherStudentsCourses);
router.get('/teacher/courses/:te_id', verificationToken, teacherCourses);
router.get('/teacher/courses/students/:te_id', teacherCoursesStudents);
router.post('/teacher/create', verificationToken, teacherCreate);
router.put('/teacher/update', verificationToken, teacherUpdate);
router.delete('/teacher/delete/:te_id', verificationToken, teacherDelete);

module.exports = router;