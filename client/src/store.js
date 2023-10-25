import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import investmentsReducer from "./slices/investment"
import investorReducer from "./slices/investor"
import hackInvestmentTotalsReducer from "./slices/hackInvestmentTotals";
import { HackEventApi } from './services/hackEventApi';


const reducer = {
  auth: authReducer,
  message: messageReducer,
  investments: investmentsReducer,
  investor: investorReducer,
  hackInvestmentTotals: hackInvestmentTotalsReducer,
  [HackEventApi.reducerPath]: HackEventApi.reducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(HackEventApi.middleware)
})

export default store;
