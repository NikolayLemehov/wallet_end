const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

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
      type: String,
      enum: categories,
      required: [true, 'Category is required'],
    },
    comment: {
      type: String,
    },
    sum: {
      type: Number,
      required: [true, 'Sum is required'],
    },
    balance: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {versionKey: false, timestamps: true},
);

const Transaction = mongoose.model('transaction', transactionSchema);

const addTransJoiSchema = Joi.object({
  date: Joi.date().required(),
  type: Joi.boolean().required(),
  category: Joi.allow(...categories).required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
  balance: Joi.number(),
});

module.exports = {
  Transaction,
  addTransJoiSchema,
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
