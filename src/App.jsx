/* eslint-disable no-shadow */
import React from 'react';
import './App.scss';
import { LoadingPokeball } from './components/LoadingPokeball';
import { PokedexContainer } from './components/PokedexContainer';
import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <PokedexContainer />
      <LoadingPokeball />
    </div>
  );
}

export default App;
