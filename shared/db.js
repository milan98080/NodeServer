const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

const updateLoginCount = (server, callback) => {
  db.query('UPDATE counters SET count = count + 1 WHERE server = ?', [server], (err, result) => {
    if (err) {
      callback(err);
    } else {
      console.log(`Login count updated for Server ${server}`);
      // Fetch server and count as JSON object from the counters table
      db.query('SELECT server, count FROM counters', (err, rows) => {
        if (err) {
          callback(err);
        } else {
          const serverCountMap = {};
          rows.forEach(row => {
            serverCountMap[row.server] = row.count;
          });
          callback(null, serverCountMap);
        }
      });
    }
  });
};

module.exports = {
  updateLoginCount
};
