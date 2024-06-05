const {Router} = require('express');

const {
  adminCreate
} = require('../controllers/admin.controller');

const router = Router();

router.post('/admin/create', adminCreate);

module.exports = router;

