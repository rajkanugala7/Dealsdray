const express = require('express');
const { register, login, dashboard } = require('../controllers/authController');

const router = express.Router();

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Dashboard (protected route)
router.get('/dashboard', dashboard);

module.exports = router;
