import React from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

const Balance = () => {

    const { transactions } = useContext(GlobalContext);
    const amount = transactions.map( transaction => transaction.amount);

    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${amount.reduce((a, b)=> (a += b), 0).toFixed(2)}</h1>
        </div>
    )
}

export default Balance
