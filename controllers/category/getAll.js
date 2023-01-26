const { ctrlWrapper } = require("../../middlewares");
const {Model: Category} = require("../../models/category.js");

const getAll = async (req, res) => {
  const result = await Category.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = ctrlWrapper(getAll);
