const express = require('express');
const authService = require('../services/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', authService.register);

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
