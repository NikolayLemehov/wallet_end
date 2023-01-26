const { Model: Transaction } = require("../../models").transactions;

function prettyNum(num) {
  return num.toString().padStart(2, "0");
}

const getStatistic = async (req, res) => {
  const { _id: owner } = req.user;
  const { year, month } = req.query;
  const transactions = await Transaction.find(
    {
      owner,
      date: {
        $gte: new Date(`${year}-${prettyNum(month)}`),
        $lte: new Date (`${year}-${prettyNum(+month + 1)}`),
      },
    },
    "-createedAt -updatedAt"
  ).populate("owner", "-createedAt -updatedAt");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: transactions,
    },
  });
};

module.exports = getStatistic;
