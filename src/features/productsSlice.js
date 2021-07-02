import { createSlice } from '@reduxjs/toolkit';
import hotel from '../assets/pictures/hotel.jpg';
import hotel1 from '../assets/pictures/hotel1.jpg';
import hotel2 from '../assets/pictures/hotel2.jpg';
import hotel3 from '../assets/pictures/hotel3.jpg';
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products:
      [{
        id: 1,
        title: "Titre de publication",
        images: [hotel, hotel1, hotel2, hotel3],
        lieu: "Lieu d'espace",
        features: ["wifi", "Déjeuner", "parking"],
        price: "400",
        type: "Hotel",
        timing: ["Jour"],
        rate: 3,
        ville: "Agadir",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      }],
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
