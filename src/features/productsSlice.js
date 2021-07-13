import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    removeProducts: (state) => {
      state.products = [];
    }
  },

});

export const { setProducts, removeProducts } = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state) => state.products.products;


export default productsSlice.reducer;
