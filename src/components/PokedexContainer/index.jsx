/* eslint-disable no-console */
import React from 'react';

import { useQueries } from 'react-query';
import axios from 'axios';

import { FaRandom } from 'react-icons/fa';
import { ListedPokemon } from '../ListedPokemon';
import { LoadingPokeball } from '../LoadingPokeball';

import './styles.scss';

export function PokedexContainer() {
  const pokemonsPerPage = useQueries(
    Array(20)
      .fill()
      .map((_, i) => ({
        queryKey: ['pokemon', i],
        queryFn: async () => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
          );
          return response.data;
        },
      })),
  );

  console.log(pokemonsPerPage);

  if (pokemonsPerPage[1].status === 'loading') return <LoadingPokeball />;
  if (pokemonsPerPage.isError) return <LoadingPokeball />;

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
        {pokemonsPerPage.map((pokemon) => (
          <ListedPokemon
            pokeName={pokemon.data.name}
            pokeImg={pokemon.data.sprites.front_default}
            pokeOrder={pokemon.data.order}
            key={pokemon.data.name}
          />
        ))}
      </div>
    </div>
  );
}
