const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const {Model: User} = require('../models').users;

const {SECRET_KEY} = process.env;

const auth = async (req, res, next) => {
  try {
    const {authorization = ''} = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer')
      next(createError(401, 'Not authorized'));

    const {id} = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token)
      next(createError(401, 'Not authorized'));

    req.user = user;
    next();
  } catch (e) {
    if (['jwt expired','invalid signature', 'jwt malformed'].includes(e.message)) {
      e.status = 401;
    }
    next(e);
  }
};

module.exports = auth;
