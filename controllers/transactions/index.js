const getAll = require('../transactions/getAll');
const getById = require('../transactions/getById');
const add = require('../transactions/add');
const { ctrlWrapper } = require('../../middlewares');

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Transaction.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw new HttpError(404, `Product with id=${id} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       result,
//     },
//   });
// };

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Transaction.findByIdAndRemove(id);
//   if (!result) {
//     throw new HttpError(404, `Product with id=${contactId} not found`);
//   }
//   res.json({
//     status: "success",
//     code: 200,
//     message: `Contact with id=${contactId} was successfully deleted`,
//     data: {
//       result,
//     },
//   });
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  //   updateById: ctrlWrapper(updateById),
  //   deleteById: ctrlWrapper(deleteById),
};
