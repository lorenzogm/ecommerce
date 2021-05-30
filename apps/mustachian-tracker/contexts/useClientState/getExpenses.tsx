import get from 'lodash.get'

import getDeltaPercentage from './getDeltaPercentage'
import getDiff from './getDiff'

export default function getExpenses({ data }) {
  const dataWithExpenses = Object.keys(data).reduce((yearAcc, year) => {
    // this is the formula to calculate the expenses:
    // total cash previous month - total cash this month + total income this month - total transfers this month

    // the total cash from the last year isn't available in the total cash array of this year
    // we need to prepend it to calculate the expenses
    const previousYearValues = get(data, `${parseInt(year) - 1}.CASH.TOTAL`)
    if (!previousYearValues) {
      return yearAcc
    }

    const lastMonthPreviousYearValue = previousYearValues
      ? previousYearValues[previousYearValues.length - 1].value
      : 0

    const expensesWithLastMonthPreviousYearValue = [
      lastMonthPreviousYearValue,
      ...data[year].CASH.TOTAL.map((dataPoint) => dataPoint.value),
    ]

    // calculate the expenses with the formula
    const expenses = expensesWithLastMonthPreviousYearValue.map(
      (cashPrevious, index) => {
        if (!expensesWithLastMonthPreviousYearValue[index + 1]) {
          return 0
        }
        const cash = expensesWithLastMonthPreviousYearValue[index + 1]
        const income = get(data, `${year}.CASH_INCOME.TOTAL.${index}.value`, 0)
        const transfer = get(
          data,
          `${year}.CASH_TRANSFER.TOTAL.${index}.value`,
          0,
        )
        return cashPrevious - cash + income - transfer
      },
    )

    // the total expenses from the last year isn't available in the total expenses array of this year
    // we need to prepend it to calculate the delta
    const expensesValuesFromPreviousYear = get(
      yearAcc,
      `${parseInt(year) - 1}.CASH_EXPENSES.TOTAL`,
    )

    const lastExpensesValueFromThePreviousYear = expensesValuesFromPreviousYear
      ? expensesValuesFromPreviousYear[
          expensesValuesFromPreviousYear.length - 1
        ].value
      : 0

    expenses.splice(-1, 1)
    const expensesDelta = getDiff([
      lastExpensesValueFromThePreviousYear,
      ...expenses,
    ])

    return {
      ...yearAcc,
      [year]: {
        ...data[year],
        'CASH_EXPENSES': {
          ...data[year].CASH_EXPENSES,
          'TOTAL': expenses.map((value, index) => ({
            label: index,
            value,
          })),
          'DELTA': expensesDelta.map((value, index) => ({
            label: index,
            value,
          })),
          'DELTA_PERCENTAGE': getDeltaPercentage({
            deltaArray: expensesDelta,
            totalValuesArray: expenses,
          }),
        },
      },
    }
  }, {})

  return dataWithExpenses
}
