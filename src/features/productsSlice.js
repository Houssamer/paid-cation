import { createSlice } from '@reduxjs/toolkit';
import hotel from '../assets/pictures/hotel.jpg';
import hotel1 from '../assets/pictures/hotel1.jpg';
import hotel2 from '../assets/pictures/hotel2.jpg';
import hotel3 from '../assets/pictures/hotel3.jpg';
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProducts: (state, action) => {
      state.espaces = action.payload;
    },
    removeProducts: (state) => {
      state.espaces = null;
    }
  },

});

export const { setProducts, removeProducts } = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state) => state.products.products;


export default productsSlice.reducer;
