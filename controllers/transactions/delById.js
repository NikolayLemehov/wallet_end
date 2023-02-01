const createError = require("http-errors");
const { Model: Transaction } = require('../../models').transactions;
// const { Model: Category } = require('../../models').category;

const delById = async (req, res) => {
  const {transactionId} = req.params;
  const { _id: owner } = req.user;

  // const category = await Category.findById(req.body.category);

  // const transaction = await Transaction.create({ ...req.body, category: category._id, owner, balanceAfter: 0 });
  const deletedTransaction = await Transaction.findById(transactionId);

  if (!deletedTransaction) throw createError(400, `${transactionId} is not valid id`);

  const transactions = await Transaction.find({owner}).sort({date: 1, updatedAt: 1});

  const transIndex = transactions.findIndex(it => it._id.toString() === transactionId);

  await Transaction.findByIdAndDelete(transactionId);

  // const addedArr = transactions.slice();
  const addedArr = transactions.slice(transIndex - 1);
  const lastRightBalance = transIndex === 0 ? 0 : transactions[transIndex - 1].balanceAfter;

  const result = [...addedArr].reduce((acc, it) => {
    it.balanceAfter = acc.balance + (it.type ? 1 : -1) * it.sum;
    acc.balance = it.balanceAfter;
    acc.collection.push(it);

    return {
      collection: acc.collection,
      balance: it.balanceAfter,
    };
  }, {collection: [], balance: lastRightBalance});
  await Transaction.create(...result.collection);

  const newCollections = await Transaction
    .find({owner}, 'updatedAt createdAt sum balanceAfter date type')
    .populate("category", "-createdAt -updatedAt")
    .sort({date: 1, updatedAt: 1});

  req.user.balance = newCollections[newCollections.length - 1].balanceAfter;
  await req.user.save();

  res.status(200).json({
    status: 'success',
    code: 200,
    message: `${transactionId} has been deleted`,
  });
};

module.exports = delById;
