const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// const subscriptionTypes = ["starter", "pro", "business"];

const user = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    // subscription: {
    //   type: String,
    //   enum: subscriptionTypes,
    //   default: "starter",
    // },
    token: {
      type: String,
      default: null,
    },
    // avatarURLType: {
    //   type: String,
    //   enum: ['local', 'web', 'default'],
    //   required: true,
    //   default: 'default',
    // },
    // avatarURL: {
    //   type: String,
    //   required: true,
    //   default: 'avatars/default.png',
    // },
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

const Model = mongoose.model("user", user);

const registerJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const emailJoiSchema = Joi.object({
  email: Joi.string().required(),
});

// const subscriptionJoiSchema = Joi.object({
//   subscription: Joi.string().valid(...subscriptionTypes).required(),
// });

const avatarJoiSchema = Joi.object({
  avatar: Joi.binary().required(),
});

module.exports = {
  Model,
  registerJoiSchema,
  loginJoiSchema,
  // subscriptionJoiSchema,
  avatarJoiSchema,
  emailJoiSchema,
};
