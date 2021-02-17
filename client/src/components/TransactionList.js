import { GlobalContext } from '../context/GlobalState'
import { useContext , useEffect } from 'react'
import { Transaction } from './Transaction'

export const TransactionList = () => {

    // const context = useContext(GlobalContext);
    // console.log(context)
    // console.log(context.transactions)
    const { transactions, getTransactions }  = useContext(GlobalContext);
    // console.log(transactions)

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h3>History</h3>
            <ul className="list">
            {transactions.map(transaction => <Transaction key={transaction.id} transaction={transaction} />)}
            </ul>
        </div>
    )
}
