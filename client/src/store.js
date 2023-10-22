import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import investmentsReducer from "./slices/investment"
import investorReducer from "./slices/investor"
import hackInvestmentTotalsReducer from "./slices/hackInvestmentTotals";


const reducer = {
  auth: authReducer,
  message: messageReducer,
  investments: investmentsReducer,
  investor: investorReducer,
  hackInvestmentTotals: hackInvestmentTotalsReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
