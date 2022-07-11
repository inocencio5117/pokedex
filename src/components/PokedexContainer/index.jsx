/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

import { FaRandom } from 'react-icons/fa';
import { ListedPokemon } from '../ListedPokemon';
import { LoadingPokeball } from '../LoadingPokeball';
import './styles.scss';

export function PokedexContainer() {
  const [page, setPage] = useState(
    'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0',
  );
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedPokemons, setSearchedPokemons] = useState({});

  async function fetchPokemons({ queryKey }) {
    const response = await axios.get(queryKey[1]);
    return response.data;
  }

  const { data, isLoading, isFetching, status } = useQuery(
    ['pokemon-list', page],
    fetchPokemons,
    {
      onSuccess: (response) => {
        setLoadedPokemons(loadedPokemons.concat(response.results));
      },
      keepPreviousData: true,
    },
  );

  const pokemonsPerPage = useQueries(
    loadedPokemons?.map((pokemon, i) => ({
      queryKey: ['pokemon', i],
      queryFn: async () => {
        const response = await axios.get(`${pokemon.url}`);

        return response;
      },
      keepPreviousData: true,
    })),
  );

  function handleSearch(element) {
    element.preventDefault();
    setSearchInput(document.querySelector('#search').value);
  }

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchInput}`,
      );

      setSearchedPokemons({ ...res.data });
      console.log(res.data);
      console.log(searchedPokemons.name, 'pikachu deveria estar auqi');
    }

    getData();
  }, [searchInput]);

  function handleLoadMore(element) {
    element.preventDefault();
    setPage(data?.next);
  }

  if (isLoading || isFetching || status === 'loading') {
    return <LoadingPokeball />;
  }

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokedex</h1>
      <div className="search">
        <input type="text" placeholder="Id ou nome do pokemon" id="search" />
        <button type="button" className="" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="surprise-button">
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
        {searchInput !== '' ? (
          <ListedPokemon
            pokeDetails={searchedPokemons}
            pokeName={searchedPokemons?.name}
            pokeOrder={searchedPokemons?.order}
            pokeImg={searchedPokemons?.sprites?.front_default}
            key={searchedPokemons?.order}
          />
        ) : (
          pokemonsPerPage.map((pokemon, i) => (
            <ListedPokemon
              pokeDetails={pokemon?.data?.data}
              pokeName={pokemon?.data?.data?.name}
              pokeOrder={pokemon?.data?.data.order}
              pokeImg={pokemon?.data?.data.sprites?.front_default}
              key={pokemon?.data?.data.name || i}
            />
          ))
        )}
      </div>

      <div className="load-more-container">
        {searchInput !== '' ? null : (
          <button
            type="button"
            id="load-more-button"
            onClick={(el) => handleLoadMore(el)}
            disabled={!data?.next}
          >
            Carregar mais
          </button>
        )}
      </div>
    </div>
  );
}
