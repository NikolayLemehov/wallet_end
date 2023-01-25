const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const emailRegexp = /^\w+[\w-.]*\w@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

const userSchema = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },
  },
  {versionKey: false, timestamps: true},
);

const Model = mongoose.model('user', userSchema);

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().min(6).max(16).required(),
  name: Joi.string().min(1).max(12).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().min(6).max(16).required(),
});

const emailJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
});

module.exports = {
  Model,
  registerJoiSchema,
  loginJoiSchema,
  emailJoiSchema,
};
