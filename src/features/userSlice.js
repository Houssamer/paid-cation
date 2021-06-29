import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: 1,
      lastName: "RIAD",
      firstName: "Houssame",
      num: "0665984565",
      email: "houssame@gmail.com",
      image: "",
      role: "",
    },
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payloads
    },
    logout: (state) => {
      state.user = null
    }
  },

});

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser= (state) => state.user.user;


export default userSlice.reducer;
