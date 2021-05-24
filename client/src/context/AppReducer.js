const AppReducer = (state, action) => {
  // console.log(state)
  // console.log(action.type)
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      // You should also avoid doing direct state-mutations(never mutate state), in redux as this will lead to side-effects.
      // Always try to create a deep-clone or copy of the state(spread operator) if you plan on doing some sort of mutation (deletion, update)
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        // transactions: [action.payload]
        transactions: [...state.transactions, action.payload],
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
