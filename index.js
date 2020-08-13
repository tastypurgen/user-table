const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task4',
})

db.connect((err, res) => {
    if (err) console.log(err)
    else console.log()
})

app.get('/', (req, res) => {
    res.send('<h1>table</h1>');
});


app.listen(process.env.PORT || 5500, () => {
    console.log('Server started...');
});
