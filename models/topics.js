const db = require('../db/connection.js');

exports.selectTopics = (req) => {
  return db.query(`SELECT * FROM topics;`).then((response) => response.rows);
};
