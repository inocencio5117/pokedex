/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useQueries, useQuery } from 'react-query';
import axios from 'axios';

import { FaRandom } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { TbPokeball } from 'react-icons/tb';
import { IoIosArrowDropupCircle } from 'react-icons/io';
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
        localStorage.setItem('pokemon-list', JSON.stringify(response?.results));
        localStorage.setItem('current-page', JSON.stringify(page));
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    const pokemonList = localStorage.getItem('pokemon-list');
    const currentPage = localStorage.getItem('current-page');

    setLoadedPokemons(JSON.parse(pokemonList));
    setPage(JSON.parse(currentPage));
  }, []);

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

  function handleLoadMore(element) {
    element.preventDefault();
    setPage((old) => old + 20);
  }

  function handleSearch(element) {
    element.preventDefault();
    setSearchInput(document.querySelector('#search-box').value);
  }

  function handleSurpriseMe(element) {
    element.preventDefault();
    const randomPokemon =
      pokemonsPerPage[Math.floor(Math.random() * pokemonsPerPage.length)];
    console.log(randomPokemon);
    setSearchInput(randomPokemon?.data?.data?.name);
  }

  function handleKeyPress(evt) {
    if (evt.keyCode === 13) {
      handleSearch(evt);
    }
  }

  useEffect(() => {
    async function getData() {
      const res = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchInput.trim()}`)
        .catch((err) => {
          if (err) setSearchedPokemons(null);
        });

      setSearchedPokemons({ ...res?.data });
    }

    getData();
  }, [searchInput]);

  return (
    <div className="pokedex-container" id="top">
      {isLoading ?? <LoadingPokeball />}
      <div className="pokeball-title-container">
        <TbPokeball color="white" className="pokeball-title" />
      </div>
      <h1 className="pokedex-title">Pokédex</h1>
      <div className="search">
        <div className="search-box-container">
          <input
            type="text"
            placeholder="Id ou nome do pokemon"
            id="search-box"
            onKeyDown={handleKeyPress}
          />
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
          >
            <GoSearch color="#fff" />
          </button>
        </div>

        <button
          type="button"
          className="surprise-button"
          onClick={handleSurpriseMe}
        >
          <FaRandom />
          Surpreenda-me
        </button>
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
              key={pokemon?.data?.data?.name || i}
            />
          ))
        )}
      </div>

      <div className="load-more-container">
        {searchInput !== '' ? (
          <button
            type="button"
            id="go-back-button"
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

      <a className="arrow-up" href="#top">
        <IoIosArrowDropupCircle />
      </a>
    </div>
  );
}
