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
    .add(1, 'days')
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

  // const transactions = await Transaction
  //   .populate("category", "-createdAt -updatedAt")
  //   .aggregate([
  //   {
  //     $match: {
  //       $and: [
  //         {$expr: {$eq: ["$owner", owner]}},
  //         {$expr: {$gte: ['$date', new Date(`${year}-${prettyNum(month)}-01`)]}},
  //         {$expr: {$lt: ['$date', new Date(`${year}-${prettyNum(+month + 1)}-01`)]}},
  //       ],
  //     },
  //   },
  //   // {
  //   //   $group: {
  //   //     _id: '$category',
  //   //     category: {$push: "$category"},
  //   //   },
  //   // },
  //   ]);
  // console.log(tr)

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions,
    },
  });
};

module.exports = getStatistic;
