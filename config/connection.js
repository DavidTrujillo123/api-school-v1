require("dotenv").config();
const pgPromise = require("pg-promise");

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
};

const pgp = pgPromise({});
const db = pgp(config);

db.any("select * from teacher;").then((res) => {
  console.log(res);
});

exports.db = db;
