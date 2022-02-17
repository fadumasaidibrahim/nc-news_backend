const db = require('../db/connection');
exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT * FROM articles
              WHERE articles.article_id = $1;`,
      [article_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'Sorry article not found',
        });
      } else {
        return response.rows[0];
      }
    });
};
