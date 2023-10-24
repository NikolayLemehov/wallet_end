const { Model: Transaction } = require('../models').transactions;


const calcBalanceAfterAndBalance = async (transactions, ownerId, user) => {
  if (transactions.length === 0) {
    user.balance = 0;
    await user.save();
    return;
  }

  const addedArr = transactions.slice();
  // const addedArr = transactions.slice(transIndex - 1);
  // const lastRightBalance = transIndex === 0 ? 0 : transactions[transIndex - 1].balanceAfter;

  const result = [...addedArr].reduce((acc, it) => {
    it.balanceAfter = acc.balance + (it.type ? 1 : -1) * it.sum;
    acc.balance = it.balanceAfter;
    acc.collection.push(it);

    return {
      collection: acc.collection,
      balance: it.balanceAfter,
    };
  }, {collection: [], balance: 0});

  await Transaction.create(...result.collection);

  const newCollections = await Transaction
    .find({owner: ownerId}, 'updatedAt createdAt sum balanceAfter date type')
    .populate("category", "-createdAt -updatedAt")
    .sort({date: 1, updatedAt: 1});

  user.balance = newCollections[newCollections.length - 1].balanceAfter;
  await user.save();

};

module.exports = calcBalanceAfterAndBalance;
