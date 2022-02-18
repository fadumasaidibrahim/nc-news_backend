
const {
  selectArticleById,
  updateArticleById,
  selectCommentsByArticleId,
  selectArticles,
} = require('../models/articles.js');


const { selectArticleById } = require('../models/articles.js');


exports.getArticleById = (req, res, next) => {
  console.log(req.params);
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });

const { getArticles } = require('../models/articles');

exports.getArticles = (req, res, next) => {
  getArticles()
    .then((articles) => {
      res.status(200).send({ articles });

    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentById = (req, res, next) => {
  console.log(req.params);
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
