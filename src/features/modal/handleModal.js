/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  pokemonDetails: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    handlePokemonDetails: (state, action) => {
      state.pokemonDetails = { ...action.payload };
    },
  },
});

export const { handleModal, handlePokemonDetails } = modalSlice.actions;

export default modalSlice.reducer;
