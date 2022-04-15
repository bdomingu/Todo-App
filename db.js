const { process_params } = require("express/lib/router");
require('dotenv').config()
const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: "todo_database",
    host: "localhost",
    port: 5432
})

module.exports = pool;