import { configureStore } from '@reduxjs/toolkit';
import pageReducer from '../features/pageSlice';
import reservationsReducer from '../features/reservationsSlice';
import userReducer from '../features/userSlice';
import espacePageReducer from '../features/espacePageSlice';
import espacesReducer from '../features/espacesSlice';
import reservationsEspaceReducer from '../features/reservationsEspaceSlice';

export const store = configureStore({
  reducer: {
    page: pageReducer,
    reservations: reservationsReducer,
    user: userReducer,
    espacePage: espacePageReducer,
    espaces: espacesReducer,
    reservationsEspace: reservationsEspaceReducer,
  },
});
