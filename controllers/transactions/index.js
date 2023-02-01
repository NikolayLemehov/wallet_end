const getAll = require("../transactions/getAll");
const getPaginationAll = require("../transactions/getPaginationAll");
const add = require("../transactions/add");
const delById = require("../transactions/delById");
const { ctrlWrapper } = require("../../middlewares");
const getStatistic = require("./getStatistic");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getPaginationAll: ctrlWrapper(getPaginationAll),
  add: ctrlWrapper(add),
  delById: ctrlWrapper(delById),
  getStatistic: ctrlWrapper(getStatistic),
};
