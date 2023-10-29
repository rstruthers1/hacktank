const mysql = require('mysql2');
const express = require('express')
require('dotenv').config()
const app = express();
const path = require('path')
const cors = require("cors");
const investmentRouter = require('./routes/investment')
const hackEventRouter = require('./routes/hackevent')

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
    process.env.HACKDB_URL
);

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use('/', investmentRouter)
app.use('/', hackEventRouter)

app.use(express.static(path.join(__dirname, 'public')))
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err)
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Magic for serving up react-client for node server
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
