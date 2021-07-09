import { createSlice } from '@reduxjs/toolkit';
import hotel from '../assets/pictures/hotel.jpg';
export const espacesSlice = createSlice({
  name: 'espaces',
  initialState: {
    espaces:
      [{
        id: 1,
        title: "Titre de publication",
        images: [hotel],
        lieu: "Lieu d'espace",
        features: ["wifi", "Déjeuner", "parking"],
        price: "400dh",
        type: "Hotel",
        timing: ["Jour", "Hour"],
        ville : "Agadir",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
      }],
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
