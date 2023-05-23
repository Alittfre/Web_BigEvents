const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'mysql123',
  database: 'bigevent',
})

module.exports = db
