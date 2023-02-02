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

  res.json({
    status: "success",
    code: 200,
    data: {
      transactions,
    },
  });
};

module.exports = getStatistic;
