const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics');
const { getUsers } = require('./controllers/users');
const {
  getArticleById,
  updateArticleVotes,
  getCommentById,
  getArticles,
} = require('./controllers/articles');
const {
  handlePsqlErrors,
  handleCustomErrors,
  handle500Errors,
} = require('./errors');

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', updateArticleVotes);
app.get('/api/users', getUsers);
app.get('/api/articles/:article_id/comments', getCommentById);
app.get('/api/articles', getArticles);

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Path not found' });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Uh oh! Server Error!' });
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handle500Errors);
module.exports = app;
