const { Router } = require('express');

const { tokenRequiered } = require('../jwt/token');

const {
  studentReadById,
  studentCreate,
  studentUpdate,
  studentDelete,
} = require('../controllers/student.controller')

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management endpoints
 */

/**
 * @swagger
 * /student/read/{st_id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: st_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */

router.get('/student/read/:st_id', studentReadById);
router.post('/student/create', studentCreate);
router.put('/student/update', studentUpdate);
router.delete('/student/delete/:st_id', studentDelete);

module.exports = router;