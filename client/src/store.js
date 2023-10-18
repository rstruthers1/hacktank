import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import investmentsReducer from "./slices/investment"
import investorReducer from "./slices/investor"


const reducer = {
  auth: authReducer,
  message: messageReducer,
  investments: investmentsReducer,
  investor: investorReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
