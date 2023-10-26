const {ConnectionString} = require('connection-string');
const con = new ConnectionString(process.env.HACKDB_URL);

module.exports = {
  HOST: con.hosts[0].name,
  USER: con.user,
  PASSWORD: con.password,
  DB: con.path[0],
  port: con.hosts[0].port,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
