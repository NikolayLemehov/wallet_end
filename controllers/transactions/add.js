const { Model: Transaction } = require('../../models').transactions;

const add = async (req, res) => {
  const { _id: owner } = req.user;

  // const find = async() => {
    //   console.log(await Transaction.find({}, "createdAt").sort({createdAt: -1}));
    // зберігаємо в масив, витягуємо баланс з елемента під 0 індексом і додаєм, щоб отримати поточний баланс
    // }
    // find();

  const { sum } = req.body;

  const balanceAfters = await Transaction.find({owner}).sort({date: -1, updatedAt: -1});

  console.log(balanceAfters);

  const lastEl = balanceAfters.length === 0 ? 0 : balanceAfters[balanceAfters.length -1];

  const balanceAfter = lastEl.balanceAfter + Number(sum);

  console.log(balanceAfter);

  const result = await Transaction.create({ ...req.body, owner, balanceAfter });
  console.log(result);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      balanceAfters,
    },
  });
};

module.exports = add;
