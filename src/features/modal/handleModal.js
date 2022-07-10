import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handleModal } = modalSlice.actions;

export default modalSlice.reducer;
