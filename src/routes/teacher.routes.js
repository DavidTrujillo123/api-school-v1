const {Router} = require('express');
const {tokenRequiered} = require('../jwt/token');

const {
  teacherCreate,
  teacherUpdate,
  teacherStudents,
  teacherCourses,
  teacherCoursesStudents,
  teacherStudentsCourses,
  teacherDelete,
  teacherReadCookie, 
} = require('../controllers/teacher.controller');

const router = Router();

router.get('/teacher/read', teacherReadCookie);
router.post('/teacher/create', teacherCreate);
//route, middleware, function
router.get('/teacher/students/:te_id', teacherStudents);
router.get('/teacher/students/courses/:te_id', teacherStudentsCourses);
router.get('/teacher/courses/:te_id', teacherCourses);
router.get('/teacher/courses/students/:te_id', teacherCoursesStudents);
router.put('/teacher/update', teacherUpdate);
router.delete('/teacher/delete/:te_id', teacherDelete);

module.exports = router;