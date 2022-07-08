import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../utils/capitalize';
import { zeroLeft } from '../../utils/zeroLeft';

export function ListedPokemon({ pokeName, pokeImg, pokeOrder }) {
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

ListedPokemon.propTypes = {
  pokeName: PropTypes.string.isRequired,
  pokeImg: PropTypes.string.isRequired,
  pokeOrder: PropTypes.number.isRequired,
};
