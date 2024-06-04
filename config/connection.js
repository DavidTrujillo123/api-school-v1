const pgPromise = require ('pg-promise');
const config = {
    host: 'localhost',
    port: '5432',
    database: 'simple_school-v2',
    user: 'postgres',
    password: '200113'
};

const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;