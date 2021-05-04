import React from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

const IncomeExpenses = () => {

    const { transactions } = useContext(GlobalContext);
    const amount = transactions.map(transaction => transaction.amount);

    //Get positive amounts
    const income = amount
    .filter(amount => amount > 0)
    .reduce((a, b) => a += b, 0)
    .toFixed(2);

    //Get negative amounts
    const expense = amount
    .filter(amount => amount < 0)
    .reduce((a, b) => a += b, 0)
    .toFixed(2);

    return (
        <div className="inc-exp-container">
            <div>
            <h4>Income</h4>
            <p className="money plus">+${income}</p>
            </div>
            <div>
            <h4>Expense</h4>
            <p className="money minus">-${Math.abs(expense)}</p>
            </div>
      </div>
    )
}

export default IncomeExpenses
