const { Model: Transaction } = require('../../models').transactions;

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Transaction.create({ ...req.body, owner });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
