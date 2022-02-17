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

exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles 
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({
          status: 400,
          msg: 'bad request - invalid sytnax used for inc_votes on body',
        });
      } else {
        return response.rows[0];
      }
    });
};
