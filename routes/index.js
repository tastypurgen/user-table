const express = require('express');
const authService = require('../services/auth');
const db = require('../services/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * from users', (err, results) => {
    console.log(results);
    res.render('index', { results });
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', authService.register);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', authService.login);

module.exports = router;
