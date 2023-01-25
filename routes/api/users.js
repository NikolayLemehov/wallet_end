const express = require("express");
const ctrl = require("../../controllers").users;
const { validation, auth } = require("../../middlewares");
const { users } = require("../../models");

const router = express.Router();

router.post("/register", validation(users.registerJoiSchema), ctrl.register);

router.post("/login", validation(users.loginJoiSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

// router.patch('/', auth, validation(users.subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
