import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../utils/capitalize';
import { zeroLeft } from '../../utils/zeroLeft';

export function ListedPokemon({ pokeName, pokeImg, pokeOrder }) {
  if (!pokeName || !pokeImg || !pokeOrder) return <p>Loading...</p>;

  return (
    <div className="pokemon-list-container">
      <img src={pokeImg} alt={pokeName} height={150} width={150} />

      <span>
        N°
        {zeroLeft(pokeOrder)}
      </span>
      <span>{capitalizeFirstLetter(pokeName)}</span>
    </div>
  );
}

ListedPokemon.defaultProps = {
  pokeName: '',
  pokeImg: '',
  pokeOrder: 0,
};

ListedPokemon.propTypes = {
  pokeName: PropTypes.string,
  pokeImg: PropTypes.string,
  pokeOrder: PropTypes.number,
};
