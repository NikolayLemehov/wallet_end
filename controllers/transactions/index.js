const getAll = require("../transactions/getAll");
const add = require("../transactions/add");
const { ctrlWrapper } = require("../../middlewares");

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
};
