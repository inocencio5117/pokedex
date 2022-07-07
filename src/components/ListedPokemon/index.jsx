import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useQuery } from 'react-query';

export function ListedPokemon({ pokeName }) {
  async function fetchPokemon() {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
    );
    return response.data;
  }

  const { data, isLoading } = useQuery('pokemon', fetchPokemon);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="pokemon-list-container">
      <img src={data.sprites.front_default} alt={pokeName} />

      <div>{data.order}</div>
      <div>{pokeName}</div>
    </div>
  );
}

ListedPokemon.propTypes = {
  pokeName: PropTypes.string.isRequired,
};
