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


exports.getArticles = async () => {
  const queryStr = await db.query(
    `SELECT * FROM articles ORDER BY created_at desc;`
  );
  return queryStr.rows;

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

exports.selectArticles = async () => {
  const queryStr = await db.query(
    `SELECT * FROM articles ORDER BY created_at desc;`
  );
  return queryStr.rows;
};
exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT articles.* , COUNT(comments.article_id)::INT AS comment_count FROM comments
        JOIN articles ON comments.article_id = articles.article_id

              WHERE comments.article_id = $1 
              GROUP BY articles.article_id ;`,

      [article_id]
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'article not found',
        });
      } else {
        return response.rows[0];
      }
    });
};
