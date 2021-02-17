import React, { createContext, useReducer }from 'react'
import AppReducer from './AppReducer';
import axios from 'axios'


// Initial State for testing
// const initialState = {
//     transactions: [
//           { id: 1, text: 'Flower', amount: -20 },
//           { id: 2, text: 'Salary', amount: 300 },
//           { id: 3, text: 'Book', amount: -10 },
//           { id: 4, text: 'Camera', amount: 150 }
//     ]
// }

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create context (global)
export const GlobalContext = createContext(initialState);

// Create provider component, this allows other components to access our initial state
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions to call the reducer

    async function getTransactions() {
        try {
            // http://localhost:5000/api/v1/transaction since we added the proxy to our package.json, we only needed the /api/v1/transaction part
            const res = await axios.get('/api/v1/transaction') 
            // res.data will get our whole object, including success, count, data
            
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })

        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transaction/${id}`)
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            }); 
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
   
    }

    async function addTransaction (newTransaction){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/transaction', newTransaction, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                // payload: newTransaction 
                // we send our data (newTransaction) from res object
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }


    }
    
    return (
    <GlobalContext.Provider value={{ transactions: state.transactions, error: state.error, loading: state.loading, getTransactions, deleteTransaction, addTransaction, getTransactions }}>
        {children}
    </GlobalContext.Provider>);
}

