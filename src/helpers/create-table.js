const moment = require('moment');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//Getting months
const getMonth = (month) => {
  if(month == 11) {
    return 0;
  } else {
    return month + 1
  }
}

//Getting efficiency
const getEfficiency = (investment, increment) => {
  investment * (increment / 100)
}

export const effCalculator = (investment, increment, period) => {
  const rowTable = [];
  let i = 0;
  while (i < period) {
    let efficiency = getEfficiency(investment, increment);
    let total = efficiency + investment;
    let firstMonth = moment().month();
    let month = getMonth(firstMonth);
    rowTable.push({
      index: i++,
      month: month,
      efficiency: efficiency,
      total: total
    })
  }
}