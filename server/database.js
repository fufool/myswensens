const mysql = require('mysql2');
require('dotenv').config();

const { MYSQL_USERNAME, MYSQL_HOSTNAME, MYSQL_PASSWORD, MYSQL_DB } = process.env;

const conn = mysql.createConnection({
    host: MYSQL_HOSTNAME,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB
});

conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('database Connected to MySQL as id ' + conn.threadId);
});

module.exports = conn;