const { Schema, model } = require("mongoose");
const Joi = require("joi");

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const Category = model("categories", categorySchema);

module.exports = { Category, joiCategorySchema };
