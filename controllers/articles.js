const { selectArticleById } = require('../models/articles.js');

exports.getArticleById = (req, res, next) => {
  console.log(req.params);
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
