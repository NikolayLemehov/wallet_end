const { Model: Transaction } = require("../../models").transactions;

function prettyNum(num) {
  return num.toString().padStart(2, "0");
}

const getStatistic = async (req, res) => {
  const {_id: owner} = req.user;
  const {year, month} = req.query;

  const transactions = await Transaction.find(
    {
      owner,
      date: {
        $gte: new Date(`${year}-${prettyNum(month)}-01`),
        $lte: new Date(new Date (`${year}-${prettyNum(+month + 1)}-01`) - 1),
      },
    },
    "-createdAt -updatedAt"
  )
  .populate("category", "-createdAt -updatedAt");

  const categories = [...new Set(transactions.map(trans => trans.category))];

  const statistic = categories.map((category) => ({
    category,
    totalSum: transactions
    .filter(trans => trans.category._id === category._id)
    .reduce((total, trans) => { return total + trans.sum }, 0)})
  );

  // const tr = await Transaction.aggregate([
  //   {
  //     $match: {
  //       $and: [
  //         {$expr: {$eq: ["$owner", owner]}},
  //         {$expr: {$gte: ['$date', new Date(`${year}-${prettyNum(month)}-01`)]}},
  //         {$expr: {$lt: ['$date', new Date(`${year}-${prettyNum(+month + 1)}-01`)]}},
  //       ]
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: '$category',
  //       category: {$push: "$category"},
  //     }
  //   }
  //   ]);
  // console.log(tr)

  res.json({
    status: "success",
    code: 200,
    data: {
      statistic,
    },
  });
};

module.exports = getStatistic;
