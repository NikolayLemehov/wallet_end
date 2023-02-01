const createError = require("http-errors");
const calcBalanceAfterAndBalance = require("../../services/calcBalanceAfterAndBalance.js");
const { Model: Transaction } = require('../../models').transactions;
// const { Model: Category } = require('../../models').category;

const delById = async (req, res) => {
  const {transactionId} = req.params;
  const { _id: owner } = req.user;

  const deletedTransaction = await Transaction.findById(transactionId);

  if (!deletedTransaction) throw createError(400, `${transactionId} is not valid id`);

  const transactions = await Transaction.find({owner}).sort({date: 1, updatedAt: 1});

  const transIndex = transactions.findIndex(it => it._id.toString() === transactionId);

  await Transaction.findByIdAndDelete(transactionId);
  transactions.splice(transIndex, 1);

  await calcBalanceAfterAndBalance(transactions, owner, req.user);

  res.status(200).json({
    status: 'success',
    code: 200,
    message: `${transactionId} has been deleted`,
  });
};

module.exports = delById;
