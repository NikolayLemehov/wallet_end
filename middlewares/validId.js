const {isValidObjectId} = require('mongoose');
const createError = require('http-errors');

const validId = (varName) => {
  return (req, res, next) => {
    const varValue = req.params[varName];
    if(!isValidObjectId(varValue)) {
      next(createError(400, `${varValue} is not valid database id`));
    }
    next();
  };
};


module.exports = validId;
