const { selectUsers } = require('../models/users.js');

exports.getUsers = (req, res, next) => {
  selectUsers(req)
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};
