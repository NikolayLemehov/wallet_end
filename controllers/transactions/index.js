const getAll = require("../transactions/getAll");
const add = require("../transactions/add");
const { ctrlWrapper } = require("../../middlewares");
const getStatistic = require("./getStatistic");

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getStatistic: ctrlWrapper(getStatistic),
};
