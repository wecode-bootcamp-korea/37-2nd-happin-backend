const jwt = require('jsonwebtoken');

const loginRequired = async (req, res, next) => {
  const token = req.headers.authorization;
  const access = jwt.verify(token, process.env.KEY);
  const { id } = access;

  req.id = id;

  return next();
};

module.exports = { loginRequired };
