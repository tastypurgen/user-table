const express = require('express');
const passport = require('passport');
const authService = require('../services/auth');
const db = require('../services/db');
const initializePassport = require('../passport-config');

const router = express.Router();

initializePassport(
  passport,
  async (email) => new Promise((resolve, reject) => db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) reject(err);
      db.query(`UPDATE users SET loginDate = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}' WHERE id = ?`, [results[0].id], (err, results) => { });
      resolve({ ...results[0] });
    },
  )),
  () => ({
    id: 5,
    name: 'dear',
    email: '1@1',
    password: '$2a$08$Ny.PVCzyaI5VxPA.0T65POFFGwzOlvbYySFC4dS4gGN5TksSs/qxm',
    status: 0,
  }),
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.render('login', { message: 'Log in first!' });
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

router.get('/', checkAuthenticated, (req, res) => {
  db.query('SELECT * from users', (err, results) => {
    res.render('index', { results, name: req.user.name });
  });
});

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register');
});

router.post('/register', authService.register);

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

router.post('/del', (req, res) => {
  const checkedArray = Object.keys(req.body);
  checkedArray.forEach((item) => {
    db.query('DELETE FROM users WHERE id = ?', [+item], (err, res) => {
      console.log(err);
      console.log(res);
    });
  });
  res.redirect('/');
});

module.exports = router;
