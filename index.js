/* eslint-disable no-console */
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const db = require('./services/db');

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

db.connect((err) => {
  if (err) console.log(err);
  else console.log('MySql connected....');
});

app.use('/', require('./routes/index'));

app.listen(process.env.PORT, () => {
  console.log('Server started.....');
});
