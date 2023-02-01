const calcBalanceAfterAndBalance = require("../../services/calcBalanceAfterAndBalance.js");
const { Model: Transaction } = require('../../models').transactions;
const { Model: Category } = require('../../models').category;

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const category = (await Category.findById(req.body.category))._id;

  const transaction = await Transaction.create({ ...req.body, category, owner, balanceAfter: 0 });
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
