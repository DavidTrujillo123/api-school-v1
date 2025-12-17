const { Router } = require('express');
const {
  adminLogin,
  teacherLogin,
  verifyToken
} = require('../controllers/auth.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/isValidToken:
 *   get:
 *     summary: Verify if the user token is valid
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid or missing token
 */
//Para que las cookies funcionen tienen que estar en la mismas rutas
router.get('/auth/isValidToken', verifyToken);

/**
 * @swagger
 * /api/v1/auth/admin:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/auth/admin', adminLogin);

/**
 * @swagger
 * /api/v1/auth/teacher:
 *   post:
 *     summary: Teacher login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/auth/teacher', teacherLogin);

module.exports = router;