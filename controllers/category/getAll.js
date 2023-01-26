const { ctrlWrapper } = require("../../middlewares");
const {Model: Category} = require("../../models/category.js");

const getAll = async (req, res, next) => {
  try {
    const result = Category.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = ctrlWrapper(getAll);
