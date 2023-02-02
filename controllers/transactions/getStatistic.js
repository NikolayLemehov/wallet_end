const moment = require("moment");
const { Model: Transaction } = require("../../models").transactions;

function prettyNum(num) {
  return num.toString().padStart(2, "0");
}

const getStatistic = async (req, res) => {
  const {_id: owner} = req.user;
  const {year, month} = req.query;
  const gte = moment(`${year}-${prettyNum(month)}-01`)
    .toDate();
  const lte = moment(`${year}-${prettyNum(month)}-01`)
    .add(1, 'months')
    .subtract(1, 'milliseconds')
    .toDate();

  const transactions = await Transaction.find(
    {
      owner,
      date: {
        $gte: gte,
        $lte: lte,
      },
    },
    "-createdAt -updatedAt",
  )
  .populate("category", "-createdAt -updatedAt");

  // first way

  // const arr = transactions
  //   // .map(trans => trans.date)
  //   .reduce((acc, trans) => {
  //     const year = new Date(trans.date).getFullYear();
  //     const month = new Date(trans.date).getMonth() + 1;
  //     if (!acc[year]) {
  //       acc.year = [];
  //     }
  //     acc.year.push(month);
  //     return acc;
  //   }, {});
  // console.log(arr);

  // second way
  // const arr = transactions.reduce((acc, trans) => {
  //   const year = new Date(trans.date).getFullYear();
  //   const month = new Date(trans.date).getMonth();
  //   return acc = month + 1;
  // }, {year: [month]});

  // console.log(arr);

  // const result = {
  //   "2022": [],
  // };

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions,
    },
  });
};

module.exports = getStatistic;
