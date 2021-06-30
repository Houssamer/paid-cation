import { createSlice } from '@reduxjs/toolkit';
import hotel from '../assets/pictures/hotel.jpg';
export const reservationsEspaceSlice = createSlice({
  name: 'reservationsEspace',
  initialState: {
    reservationsEspace:
      [{
        id: 1,
        title: "Titre de publication",
        image: hotel,
        lieu: "Lieu d'espace",
        features: ["wifi", "Déjeuner", "parking"],
        price: "1200dh",
        type: "Hotel",
        duree: "3 jours",
        num: '0665684891',
        email: 'user@gmail.com',
        lastName: 'nom',
        firstName: 'prenom',

      }],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setReservations: (state, action) => {
      state.reservationsEspace = action.payload;
    },
    removeReservations: (state) => {
      state.reservationsEspace = null;
    }
  },

});

export const { setReservations, removeReservations } = reservationsEspaceSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReservations = (state) => state.reservationsEspace.reservationsEspace;


export default reservationsEspaceSlice.reducer;
