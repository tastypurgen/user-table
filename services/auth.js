/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const db = require('./db');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const date = new Date();

  db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) console.log(err);
    else if (results.length > 0) return res.render('register', { message: 'Email is already taken' });

    const hashedPassword = await bcrypt.hash(password, 8);

    db.query('INSERT INTO users SET ?', {
      name,
      email,
      password: hashedPassword,
      registerDate: date,
      loginDate: date,
    }, (error, result) => {
      if (err) {
        console.log(error);
      } else {
        return res.render('login', { message: 'User registered! Now you can log in' });
      }
    });
  });
};
