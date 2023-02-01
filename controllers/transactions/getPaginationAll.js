const { Model:Transaction } = require('../../models').transactions;

const getPaginationAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;

  const length = (await Transaction.find({owner})).length;

  const transactions = await Transaction.find(
    { owner },
    '-createdAt -updatedAt',
    // 'createdAt updatedAt date sum',
    {
      skip,
      limit,
    },
  )
    .populate('category', 'name')
    .sort({date: -1, updatedAt: -1});

  res.json({
    status: 'success',
    code: 200,
    data: {
      transactions,
      page,
      limit,
      length,
    },
  });
};

module.exports = getPaginationAll;
