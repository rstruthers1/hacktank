const mysql = require('mysql2');

const cool = require('cool-ascii-faces')
const express = require('express')
require('dotenv').config()
const app = express();
const path = require('path')
const cors = require("cors");
const animalsRouter = require('./routes/animals')

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001

const connection = mysql.createConnection(
    process.env.JAWSDB_URL
);

app.use('/', animalsRouter);


connection.query(
    'SELECT * FROM animals',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);


app.use(express.static(path.join(__dirname, 'public')))
app.use('/', animalsRouter)
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err)
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/cool', (req, res) => res.send(cool()))
app.get('/times', (req, res) => res.send(showTimes()))
// comment
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(PORT, () => console.log(`Listening on ${PORT}`))


function showTimes() {
    const times = process.env.TIMES || 5
    let result = ''
    for (i = 0; i < times; i++) {
        result += i + ' '
    }
    return result
}
