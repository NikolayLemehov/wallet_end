const { Model:Transaction } = require('../../models').transactions;

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find(
    { owner },
    '-createdAt -updatedAt',
    // 'createdAt updatedAt date sum',
    {
      skip,
      limit,
    },
  )
    .populate('owner', 'name')
    .sort({date: 1, updatedAt: 1});

  res.json({
    status: 'success',
    code: 200,
    data: {
      transactions,
      page,
      limit,
      length: transactions.length,
    },
  });
};

module.exports = getAll;
