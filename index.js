const path = require('path');
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

db.connect((err) => {
  if (err) console.log(err);
  else console.log('MySql connected');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || 5500, () => {
  console.log('Server started...');
});
