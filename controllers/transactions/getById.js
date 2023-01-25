const HttpError = require('../../helpers/HttpError.js');
const { Transaction } = require('../../models').transactions;

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findById(id);
  if (!result) {
    throw new HttpError(404, `Product with id=${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
