import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "../features/slices/basketSlice"

const rootReducer = combineReducers({
  basket: basketReducer
})

export default rootReducer