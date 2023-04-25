// importing database
const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' });

// console.log(process.env);
let pool;
// creating conditional statment for node environment
if (process.env.NODE_ENV == 'development') {

      pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: process.env.DB_PORT ,
});
} else {
     pool = mysql.createPool({
    host: process.env.DB_HOST_PROD,
    database: process.env.DB_NAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    user: process.env.DB_USER_PROD,
    port: process.env.DB_PORT_PROD,
});
// console.log('Database Connected');

}

let sql = 'SELECT * FROM users';

pool.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Database Connected Successfully');
});


// exporting connection
module.exports = pool.promise();