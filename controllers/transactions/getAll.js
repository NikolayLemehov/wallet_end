const { Model:Transaction } = require('../../models').transactions;

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const transactions = await Transaction.find(
    { owner },
    '-updatedAt',
    // 'createdAt sum balanceAfter type',
  )
    .populate('category', 'name')
    .sort({date: -1, createdAt: -1});

  res.json({
    status: 'success',
    code: 200,
    transactions,
  });
};

module.exports = getAll;
