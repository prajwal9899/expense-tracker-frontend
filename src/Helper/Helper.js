import _ from "lodash";

export function getSum(transaction, type) {
  // console.log(transaction, "data");
  let sum = _(transaction)
    .groupBy("type")
    .map((obj, key) => {
      if (!type) return _.sumBy(obj, "amount");
      return {
        type: key,
        color: obj[0].color,
        total: _.sumBy(obj, "amount"),
      };
    })
    .value();
  
  var expenseSum = [];
  var savingsSum = [];

  if (transaction !== undefined) {
    transaction
      .filter((item) => {
        return item.type === "Savings";
      })
      .map((item) => {
        return savingsSum.push(item.amount);
      });

    transaction
      .filter((item) => {
        return item.type === "Expense" || item.type === "Investment";
      })
      .map((item) => {
        return expenseSum.push(item.amount);
      });
  }

  var savings = 0;
  var expense = 0;

  if (transaction !== undefined) {
    for (let i = 0; i < expenseSum.length; i++) {
      expense += expenseSum[i];
    }

    for (let i = 0; i < savingsSum.length; i++) {
      savings += savingsSum[i];
    }
  }
  let totalAmount = savings - expense;

  console.log(totalAmount);

  return sum;
}

export function getLabels(transaction) {
  // let amountSum = getSum(transaction, "type");
  // let Total = _.sum(getSum(transaction));
  // let percent = _(amountSum)
  //   .map((obj) => _.assign(obj, { percent: (100 * obj.total) / Total }))
  //   .value();

  // return percent;

  let amountSum = getSum(transaction, "type");
  let Total = _.sum(getSum(transaction));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function chartData(transaction, custom) {
  let dataValue = getSum(transaction);

  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);

  const config = {
    data: {
      datasets: [
        {
          label: "My First Dataset",
          data: dataValue,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
}

export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
