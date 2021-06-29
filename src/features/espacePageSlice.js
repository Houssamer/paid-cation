import { createSlice } from '@reduxjs/toolkit';

export const espacePageSlice = createSlice({
  name: 'espacePage',
  initialState: {
    espacePage: {
      espace: true,
      espaceAdd: false,
      espaceEdit: false,
      reservation: false,
      reservationEdit: false,
      information: false,
      informationEdit: false
    }
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setReservation: (state) => {
      state.espacePage = {
        espace: false,
        espaceAdd: false,
        espaceEdit: false,
        reservation: true,
        reservationEdit: false,
        information: false,
        informationEdit: false,
      }
    },
    setReservationDet: (state, action) => {
      state.espacePage = {
        espace: false,
        espaceAdd: false,
        espaceEdit: false,
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
      state.espacePage = {
        espace: false,
        espaceAdd: false,
        espaceEdit: false,
        reservation: false,
        reservationEdit: false,
        information: true,
        informationEdit: false,
      }
    },
    setInformationEdit: (state) => {
      state.espacePage = {
        espace: false,
        espaceAdd: false,
        espaceEdit: false,
        reservation: false,
        reservationEdit: false,
        information: false,
        informationEdit: true,
      }
    },
    setEspace: (state) => {
      state.espacePage = {
        espace: true,
        espaceAdd: false,
        espaceEdit: false,
        reservation: false,
        reservationEdit: false,
        information: false,
        informationEdit: false,
      }
    },
      setEspaceAdd: (state) => {
        state.espacePage = {
          espace: false,
          espaceAdd: true,
          espaceEdit: false,
          reservation: false,
          reservationEdit: false,
          information: false,
          informationEdit: false,
        }
      },
      setEspaceEdit: (state) => {
        state.espacePage = {
          espace: false,
          espaceAdd: false,
          espaceEdit: true,
          reservation: false,
          reservationEdit: false,
          information: false,
          informationEdit: false,
        }
      },
  },

});

export const { 
    setReservation, 
    setReservationDet, 
    setInformation, 
    setInformationEdit, 
    setEspace,
    setEspaceAdd,
    setEspaceEdit,
   } = espacePageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectReservation = (state) => state.espacePage.espacePage.reservation;
export const selectReservationEdit = (state) => state.espacePage.espacePage.reservationEdit;
export const selectInfo = (state) => state.espacePage.espacePage.information;
export const selecInfoEdit = (state) => state.espacePage.espacePage.informationEdit;
export const selectEspace = (state) => state.espacePage.espacePage.espace;
export const selectEspaceAdd = (state) => state.espacePage.espacePage.espaceAdd;
export const selectEspaceEdit = (state) => state.espacePage.espacePage.espaceEdit;

export default espacePageSlice.reducer;
