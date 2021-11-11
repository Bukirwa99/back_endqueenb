const { Router } = require('express');
const authController = require('../controllers/authController')
const router = Router();

router.post('/login_student', authController.login_post);
router.post('/login_facilitator', authController.login_post);
router.post('/register', authController.register_post);

module.exports = router;