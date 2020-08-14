/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const db = require('./services/db');

dotenv.config({ path: './.env' });

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((err) => {
  if (err) console.log(err);
  else console.log('MySql connected....');
});

app.use('/', require('./routes/index'));

app.listen(process.env.PORT || 5500, () => {
  console.log('Server started.....');
});
