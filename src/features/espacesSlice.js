import { createSlice } from '@reduxjs/toolkit';

export const espacesSlice = createSlice({
  name: 'espaces',
  initialState: {
    espaces: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEspaces: (state, action) => {
      state.espaces = action.payload;
    },
    removeEspaces: (state) => {
      state.espaces = null;
    }
  },

});

export const { setEspaces, removeEspace } = espacesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectEspaces = (state) => state.espaces.espaces;


export default espacesSlice.reducer;
