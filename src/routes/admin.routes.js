const {Router} = require('express');

const {
  adminLogin,
  adminCreate
} = require('../controllers/admin.controller');

const router = Router();
router.post('/admin/login', adminLogin);
router.post('/admin/create', adminCreate);

module.exports = router;

