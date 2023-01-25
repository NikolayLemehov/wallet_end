const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const categoryTypes = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Educations',
  'Leisure',
];

const transactionSchema = new Schema(
  {
    Type: {
      type: Boolean,
      required: true,
    },
    Category: {
      type: String,
      enum: categoryTypes,
      required: [true, 'Set category for transaction'],
    },
    Comment: {
      type: String,
      default: 'Transaction without comment',
    },
    Sum: {
      type: Number,
      default: 0,
      minimum: 0,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

transactionSchema.post('save', HandleMongooseError);

const transactionJoiSchema = Joi.object({
  Type: Joi.boolean().required(),
  Category: Joi.string()
    .valid(...categoryTypes)
    .required(),
  Comment: Joi.string(),
  Sum: Joi.number().min(0).required(),
});

const Model = model('transaction', transactionSchema);

module.exports = {
  transactionJoiSchema,
  Model,
};
