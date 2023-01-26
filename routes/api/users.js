const express = require("express");
const ctrl = require("../../controllers").users;
const { validation, auth } = require("../../middlewares");
const { users } = require("../../models");

const router = express.Router();

router.post("/signup", validation(users.registerJoiSchema), ctrl.register);

router.post("/signin", validation(users.loginJoiSchema), ctrl.login);

router.post("/signout", auth, ctrl.logout);

router.get("/current", auth, ctrl.getCurrent);


// router.patch('/', auth, validation(users.subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
