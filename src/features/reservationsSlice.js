import { createSlice } from '@reduxjs/toolkit';

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setReservations: (state, action) => {
      state.reservations = [...state.reservations, action.payload];
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
