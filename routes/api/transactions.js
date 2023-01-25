const express = require('express');
// const ctrl = require('../../controllers/users/index.js');
const { validation, auth } = require('../../middlewares');
// const { users } = require('../../models/index.js');

const ctrl = require('../../controllers').transactions;
const { transactions } = require('../../models');

const router = express.Router();

// router.post(
//   '/transactions',
//   validation(users.registerJoiSchema),
//   ctrl.register,
// );

// router.get('/transactions/:id', validation(users.loginJoiSchema), ctrl.login);

// router.get('/transactions/:id/month', auth, ctrl.getCurrent);

// router.post('/transactions/:id/year', auth, ctrl.logout);

// router.patch('/', auth, validation(users.subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription));

router.get('/', auth, ctrl.getAll);

router.post ('/', auth, validation(transactions.addTransJoiSchema), ctrl.add);

router.get('/categories', auth);

router.get('/statistic', auth);


module.exports = router;
