const getAll = require("../transactions/getAll");
const getPaginationAll = require("../transactions/getPaginationAll");
const add = require("../transactions/add");
const { ctrlWrapper } = require("../../middlewares");
const getStatistic = require("./getStatistic");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getPaginationAll: ctrlWrapper(getPaginationAll),
  add: ctrlWrapper(add),
  getStatistic: ctrlWrapper(getStatistic),
};
