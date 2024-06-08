const pgPromise = require ('pg-promise');
const config = {
    host: 'localhost',
    port: '5432',
    database: 'simple-school-v3',
    user: 'postgres',
    password: '200113'
};

const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;