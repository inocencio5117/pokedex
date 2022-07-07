/* eslint-disable no-console */
import React from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';

import { FaRandom } from 'react-icons/fa';
import { ListedPokemon } from '../ListedPokemon';
import { LoadingPokeball } from '../LoadingPokeball';

import './styles.scss';

export function PokedexContainer() {
  async function fetchPokemons() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return response.data;
  }

  const { data, isLoading } = useQuery('pokemons', fetchPokemons);

  if (isLoading) return <LoadingPokeball />;

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokedex</h1>
      <div className="search">
        <button type="button">
          <FaRandom />
          Surpreenda-me
        </button>

        <select name="" id="" defaultValue="">
          <option value="" disabled hidden>
            Organizar resultados por...
          </option>
          <option value="A-Z">A-Z</option>
        </select>
      </div>
      <div className="pokemon-list">
        {data.results.map((pokemon) => (
          <ListedPokemon pokeName={pokemon.name} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
}
