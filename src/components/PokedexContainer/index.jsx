/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

import { FaRandom } from 'react-icons/fa';
import { ListedPokemon } from '../ListedPokemon';
import { LoadingPokeball } from '../LoadingPokeball';
import './styles.scss';

export function PokedexContainer() {
  const [page, setPage] = useState(20);
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedPokemons, setSearchedPokemons] = useState({});

  async function fetchPokemons(currentPage = 20) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${currentPage}&offset=0`,
    );
    return response.data;
  }

  const { data, isLoading } = useQuery(
    ['pokemon-list', page],
    () => fetchPokemons(page),
    {
      onSuccess: (response) => {
        setLoadedPokemons(response.results);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
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
      refetchOnWindowFocus: false,
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
    }

    getData();
  }, [searchInput]);

  function handleLoadMore(element) {
    element.preventDefault();
    setPage((old) => old + 20);
  }

  return (
    <div className="pokedex-container">
      {isLoading ?? <LoadingPokeball />}
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
            key={searchedPokemons?.order}
          />
        ) : (
          pokemonsPerPage.map((pokemon, i) => (
            <ListedPokemon
              pokeDetails={pokemon?.data?.data}
              key={pokemon?.data?.data.name || i}
            />
          ))
        )}
      </div>

      <div className="load-more-container">
        {searchInput !== '' ? (
          <button
            type="button"
            id="load-more-button"
            onClick={() => setSearchInput('')}
          >
            Voltar
          </button>
        ) : (
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
