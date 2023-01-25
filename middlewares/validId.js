const {isValidObjectId} = require("mongoose");
const createError = require("http-errors");

const validId = (req, res, next) => {
  const {contactId} = req.params;
  if(!isValidObjectId(contactId)) {
    next(createError(400, `${contactId} is not valid database id`));
  }
  next();
};

module.exports = validId;
