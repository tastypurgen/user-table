/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
      'register-date': date,
      'login-date': date,
    }, (error, result) => {
      if (err) console.log(error);
      else {
        return res.render('register', { message: 'User registered!' });
      }
      return null;
    });
    return null;
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).render('login', { message: 'Invalid credentials' });

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (!results || !(await bcrypt.compare(password, results[0].password))) {
        res.status(401).render('login', { message: 'Invalid credentials' });
      } else {
        const { id } = results[0];
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        console.log(token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000,
          ),
          httpOnly: true,
        };
        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect('/');
      }
    });
  } catch (error) {
    console.log(error);
  }
  return null;
};
