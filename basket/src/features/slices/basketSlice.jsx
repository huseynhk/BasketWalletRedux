import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  basket: [],
  amount: 0,
  totalAmount: 0,
  totalPrice: 0,
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.amount++;
        existingProduct.totalAmount++;
        existingProduct.totalPrice += existingProduct.price;
        state.totalAmount++;
        state.totalPrice += action.payload.price;
      } else {
        state.basket.push(action.payload);
        state.totalAmount++;
        state.totalPrice += action.payload.price;
      }
    },

    removeFromCart: (state, action) => {
      const removedProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );

      if (removedProduct) {
        state.basket = state.basket.filter(
          (product) => product.id !== action.payload.id
        );
        state.totalAmount -= removedProduct.amount;
        state.totalPrice -= removedProduct.totalPrice;
      }
    },

    increament: (state, action) => {
      const findIndex = state.basket.find(
        (product) => product.id === action.payload.id
      );

      if (findIndex) {
        findIndex.amount++;
        findIndex.totalPrice += findIndex.price;
        findIndex.totalAmount++;
        state.totalPrice += findIndex.price;
        state.totalAmount++;
      }
    },

    decrement: (state, action) => {
      const findIndex = state.basket.find(
        (product) => product.id === action.payload.id
      );

      if (findIndex && findIndex.amount > 1) {
        findIndex.amount--;
        findIndex.totalPrice -= findIndex.price;
        findIndex.totalAmount--;
        state.totalAmount--;
        state.totalPrice -= findIndex.price;
      }
    },

    clearBasket: (state) => {
      state.basket = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, increament, decrement , clearBasket} =
  basketSlice.actions;
export default basketSlice.reducer;
