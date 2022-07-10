import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../features/modal/handleModal';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
