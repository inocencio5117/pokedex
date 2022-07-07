/* eslint-disable no-shadow */
import React from 'react';
import './App.scss';
import { LoadingPokeball } from './components/LoadingPokeball';
import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <h1>Pokedex</h1>
      <LoadingPokeball />
    </div>
  );
}

export default App;
