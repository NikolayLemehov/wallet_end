const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const categories = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

const transactionSchema = new Schema({
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    type: {
      type: Boolean,
      required: [true, 'Type is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
    sum: {
      type: Number,
      default: 0,
      minimum: 0,
      required: [true, 'Sum is required'],
    },
    balanceAfter: {
      type: Number,
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

const Model = model('transaction', transactionSchema);

const addTransJoiSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.boolean().required(),
  category: Joi.allow(...categories).required(),
  comment: Joi.string(),
  sum: Joi.number().min(0.01).required(),
  balanceAfter: Joi.number(),
});

const getStatisticJoiSchema = Joi.object({
  year: Joi.number().integer().min(2000).required(),
  month: Joi.number().integer().min(1).max(12).required(),
});

module.exports = {
  addTransJoiSchema,
  getStatisticJoiSchema,
  Model,
};

// TO DO
// const find = async() => {
//   console.log(await Transaction.find({}, "createdAt").sort({createdAt: -1}));
// зберігаємо в масив, витягуємо баланс з елемента під 0 індексом і додаєм, щоб отримати поточний баланс
// }
// find();

// приймає місяць та рік (month = 1, year = 2023)
// const arr = await Transaction.find({ date: { $gte: 1-${month}-2023, $lte: 32-2-2023 } });
// на фронт енді:
// categories = масив категорій
// categories.map()
// arr.filter(trans.category == "").reduce((total, trans) => { return total + trans.sum }, 0)
