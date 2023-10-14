const mysql = require('mysql2');
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

const connection = mysql.createConnection({
    connectionUri: process.env.JAWSDB_URL
});

connection.query(
    'SELECT * FROM animals',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
    .get('/cool', (req, res) => res.send(cool()))
    .get('/times', (req, res) => res.send(showTimes()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function showTimes() {
    const times = process.env.TIMES || 5
    let result = ''
    for (i = 0; i < times; i++) {
        result += i + ' '
    }
    return result
}
