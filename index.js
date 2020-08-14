/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./services/db');

dotenv.config({ path: './.env' });

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

db.connect((err) => {
  if (err) console.log(err);
  else console.log('MySql connected....');
});

app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 5500, () => {
  console.log('Server started.....');
});
