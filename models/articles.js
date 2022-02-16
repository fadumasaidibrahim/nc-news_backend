const db = require('../db/connection');

exports.getArticles = async () => {
  const queryStr = await db.query(
    `SELECT * FROM articles ORDER BY created_at desc;`
  );
  return queryStr.rows;
};
