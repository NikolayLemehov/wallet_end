const { Model:Transaction } = require('../../models').transactions;

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const transactions = await Transaction.find(
    { owner },
    '-createdAt -updatedAt',
  )
    .populate('category', 'name')
    .sort({date: -1, updatedAt: -1});

  res.json({
    status: 'success',
    code: 200,
    transactions,
  });
};

module.exports = getAll;
