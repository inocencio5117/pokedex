/* eslint-disable no-console */
import React, { useCallback, useMemo, useState } from 'react';

import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

import { FaRandom } from 'react-icons/fa';
import { ListedPokemon } from '../ListedPokemon';
import { LoadingPokeball } from '../LoadingPokeball';

import './styles.scss';

export function PokedexContainer() {
  const [page, setPage] = useState('https://pokeapi.co/api/v2/pokemon');

  async function fetchPokemons({ queryKey }) {
    const response = await axios.get(queryKey[1]);
    return response.data;
  }

  const { data, isLoading, isFetching, loading, error, status, refetch } =
    useQuery(['pokemon-list', page], fetchPokemons);

  const cachedMutatedData = useMemo(
    useCallback(() => {
      if (loading || error) return null;

      const pokemonNames = [];
      data?.results.map((poke) => pokemonNames.push(poke.name));
      return pokemonNames;
    }, [loading, error, data]),
    [page, data],
  );

  // console.log(cachedMutatedData);
  console.log(page);

  const pokemonsPerPage = useQueries(
    cachedMutatedData?.map((pokemon, i) => ({
      queryKey: ['pokemon', i],
      queryFn: async () => {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
        );
        return response.data;
      },
    })),
  );

  // console.log(pokemonsPerPage);

  if (isLoading || isFetching || status === 'loading') {
    return <LoadingPokeball />;
  }

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
        {!pokemonsPerPage ? (
          <p>Loading...</p>
        ) : (
          pokemonsPerPage.map((pokemon) => (
            <ListedPokemon
              pokeName={pokemon?.data?.name}
              pokeOrder={pokemon?.data?.order}
              pokeImg={pokemon?.data?.sprites?.front_default}
              key={pokemon?.data?.name}
            />
          ))
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            setPage(
              data?.previous === null
                ? 'https://pokeapi.co/api/v2/pokemon/ '
                : data?.previous,
            );
            refetch();
          }}
          disabled={page === 'https://pokeapi.co/api/v2/pokemon/'}
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => {
            setPage(data?.next);
            refetch();
          }}
          disabled={!data?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
