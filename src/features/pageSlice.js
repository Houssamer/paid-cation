import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    page: {
      reservation: true,
      reservationEdit: false,
      information: false,
      informationEdit: false
    }
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setReservation: (state) => {
      state.page = {
        reservation: true,
        reservationEdit: false,
        information: false,
        informationEdit: false,
      }
    },
    setReservationDet: (state, action) => {
      state.page = {
        reservation: false,
        reservationEdit: {
          bool: true,
          id: action.payload,
        },
        information: false,
        informationEdit: false,
      }
    },
    setInformation: (state) => {
      state.page = {
        reservation: false,
        reservationEdit: false,
        information: true,
        informationEdit: false,
      }
    },
    setInformationEdit: (state) => {
      state.page = {
        reservation: false,
        reservationEdit: false,
        information: false,
        informationEdit: true,
      }
    }
  },

});

export const { setReservation, setReservationDet, setInformation, setInformationEdit } = pageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReservation = (state) => state.page.page.reservation;
export const selectReservationEdit = (state) => state.page.page.reservationEdit;
export const selectInfo = (state) => state.page.page.information;
export const selecInfoEdit = (state) => state.page.page.informationEdit;

export default pageSlice.reducer;
