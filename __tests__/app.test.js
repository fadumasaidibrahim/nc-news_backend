const request = require('supertest');
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const db = require('../db/connection');

afterAll(() => db.end());
beforeEach(() => seed(data));

describe('app', () => {
  describe('GET - /api/topics', () => {
    test('status:200, responds with an array of topic objects', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).toHaveLength(3);
          expect(topics).toBeInstanceOf(Array);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
    test("status:404, responds with a message 'Path not found' when there is an incorrect pathway", () => {
      return request(app)
        .get('/api/topic')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Path not found');
        });
    });
  });
  describe('GET - /api/articles/:article_id', () => {
    test('status:200, responds with an article object', () => {
      return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toEqual({
            article_id: 5,
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: '2020-08-03T13:14:00.000Z',
            votes: 0,
          });
        });
    });
    describe('Path - /api/articles/:article_id', () => {
      test('status:200, responds with an article object', () => {
        const articleUpdate = {
          inc_votes: 12,
        };
        return request(app)
          .patch('/api/articles/5')
          .send(articleUpdate)
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).toEqual({
              article_id: 5,
              title: 'UNCOVERED: catspiracy to bring down democracy',
              topic: 'cats',
              author: 'rogersop',
              body: 'Bastet walks amongst us, and the cats are taking arms!',
              created_at: '2020-08-03T13:14:00.000Z',
              votes: 12,
            });
          });
      });
      describe('/API/USERS', () => {
        describe('GET /api/users', () => {
          test('status: 200 - responds with user object', () => {
            return request(app)
              .get('/api/users')
              .expect(200)
              .then((response) => {
                expect(Object.keys(response.body)).toHaveLength(1);
                expect(Object.keys(response.body)[0]).toEqual('users');
                expect(response.body.users).toHaveLength(4);
                response.body.users.forEach((users) => {
                  expect(users).toEqual(
                    expect.objectContaining({
                      username: expect.any(String),
                      name: expect.any(String),
                      avatar_url: expect.any(String),
                    })
                  );
                });
              });
          });
          describe('GET - /api/articles', () => {
            test('status:200, responds with an array of articles objects', () => {
              return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: { articles } }) => {
                  expect(articles).toHaveLength(12);
                  expect(articles).toBeInstanceOf(Array);
                  articles.forEach((article) => {
                    expect(article).toEqual(
                      expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                      })
                    );
                  });
                });
            });

            describe('GET /api/articles/:article_id/comments', () => {
              test('status:200, responds with an comment object', () => {
                return request(app)
                  .get('/api/articles/5/comments')
                  .expect(200)
                  .then(({ body: { article } }) => {
                    console.log(article);
                    expect(article).toEqual(
                      expect.objectContaining({
                        body: expect.any(String),
                        title: expect.any(String),
                        votes: expect.any(Number),
                        author: expect.any(String),
                        article_id: 5,
                        topic: expect.any(String),
                        comment_count: 2,
                        created_at: expect.any(String),
                      })
                    );
                  });
              });
            });
          });
        });
      });
    });
  });
});
