const calcBalanceAfterAndBalance = require("../../services/calcBalanceAfterAndBalance.js");
const createError = require("http-errors");
const { Model: Transaction } = require('../../models').transactions;
const { Model: Category } = require('../../models').category;

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const categoryModel = await Category.findById(req.body.category);

  if (req.body.type === false && categoryModel === null) throw createError(400, `The category must be in the expense transaction.`);

  const category = categoryModel?._id || '';

  const transData = { ...req.body, owner, balanceAfter: 0 };
  if (!req.body.type) transData.category = category;

  const transaction = await Transaction.create(transData);
  const transactions = await Transaction.find({owner}).sort({date: 1, createdAt: 1});

  const transIndex = [...transactions].findIndex(it => it._id.toString() === transaction._id.toString());

  await calcBalanceAfterAndBalance(transactions, owner, req.user);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: transactions[transIndex],
    },
  });
};

module.exports = add;
