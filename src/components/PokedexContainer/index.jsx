import React from 'react';
import './styles.scss';
import { FaRandom } from 'react-icons/fa';

export function PokedexContainer() {
  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokedex</h1>
      <div className="search">
        <button type="button">
          <FaRandom />
          Surpreenda-me
        </button>

        <select name="" id="">
          <option value="" disabled selected hidden>
            Organizar resultados por...
          </option>
          <option value="A-Z">A-Z</option>
        </select>
      </div>
    </div>
  );
}
