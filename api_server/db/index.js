const mysql = require('mysql')
const { promisify } = require('util')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql123',
    database: 'big_events'
})

queryByPromisify = promisify(db.query).bind(db)

db.queryByPromisify = queryByPromisify

module.exports = db