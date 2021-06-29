import { createSlice } from '@reduxjs/toolkit';
import hotel from '../assets/pictures/hotel.jpg';
export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations:
      [{
        id: 1,
        title: "Titre de publication",
        image: hotel,
        lieu: "Lieu d'espace",
        features: ["wifi", "Déjeuner", "parking"],
        price: "1200dh",
        type: "Hotel",
        duree: "3 jours",
        num: '0635464847',
        email: 'espace@gmail.com'
      }],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    removeReservations: (state) => {
      state.reservations = null;
    }
  },

});

export const { setReservations, removeReservations } = reservationsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReservations = (state) => state.reservations.reservations;


export default reservationsSlice.reducer;
