import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'
import { numberWithCommas } from '../utils/format'


export const Balance = () => {

    const { transactions }  = useContext(GlobalContext);
    console.log(transactions)
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2); // or amounts.reduce((acc, item) => (acc += item), 0)


    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(total)}</h1>
        </div>
    )
}
