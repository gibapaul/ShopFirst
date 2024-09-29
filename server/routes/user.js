const router = require('express').Router();
const ctrls = require('../controllers/user');

// Định nghĩa các route cho người dùng
router.post('/register', ctrls.register);
router.post('/login', ctrls.login);

module.exports = router;

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE
