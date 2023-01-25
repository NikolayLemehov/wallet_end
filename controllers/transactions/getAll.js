const { Transaction } = require('../../models').transactions;

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const transactions = await Transaction.find(
    { owner },
    '-createedAt -updatedAt',
    {
      skip,
      limit,
    },
  ).populate('owner', 'name email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: transactions,
    },
  });
};

module.exports = getAll;
