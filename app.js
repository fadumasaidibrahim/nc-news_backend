const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics');
const { getArticleById } = require('./controllers/articles');

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Path not found' });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Uh oh! Server Error!' });
});
module.exports = app;
