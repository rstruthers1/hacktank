const mysql = require('mysql2');


const cool = require('cool-ascii-faces')
const express = require('express')
require('dotenv').config()
const app = express();
const path = require('path')
const cors = require("cors");
const animalsRouter = require('./routes/animals')
const investmentRouter = require('./routes/investment')

app.use(express.json());
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// database
const db = require("./models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });


const PORT = process.env.PORT || 5001

const connection = mysql.createConnection(
    process.env.JAWSDB_URL
);

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use('/', animalsRouter);
app.use('/', investmentRouter)


connection.query(
    'SELECT * FROM animals',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);


app.use(express.static(path.join(__dirname, 'public')))
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err)
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// app.get('/', (req, res) => res.render('pages/index'))
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
    //   Fix the Error EADDRINUSE
    .on("error", function (err) {
        process.once("SIGUSR2", function () {
            process.kill(process.pid, "SIGUSR2");
        });
        process.on("SIGINT", function () {
            // this is only called on ctrl+c, not restart
            process.kill(process.pid, "SIGINT");
        });
    });


function showTimes() {
    const times = process.env.TIMES || 5
    let result = ''
    for (i = 0; i < times; i++) {
        result += i + ' '
    }
    return result
}

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
