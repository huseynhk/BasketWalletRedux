import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  balans: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    increamentBalans: (state, action) => {
      state.balans += action.payload;
    },

    decrementAmounth: (state, action) => {
      state.balans -= action.payload;
    },
  },
});

export const { increamentBalans, decrementAmounth } = walletSlice.actions;
export default walletSlice.reducer;
