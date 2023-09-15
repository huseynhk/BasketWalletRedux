import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "../features/slices/basketSlice"
import walletReducer from "../features/slices/walletSlice"

const rootReducer = combineReducers({
  basket: basketReducer,
  wallet: walletReducer,
})

export default rootReducer