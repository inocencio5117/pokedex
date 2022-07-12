/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { capitalizeFirstLetter } from '../../utils/capitalize';
import { zeroLeft } from '../../utils/zeroLeft';

import {
  handleModal,
  handlePokemonDetails,
} from '../../features/modal/handleModal';
import { LoadingPokeball } from '../LoadingPokeball';

export function ListedPokemon({ pokeDetails, pokeName, pokeImg, pokeOrder }) {
  const dispatch = useDispatch();

  function handlePokemonProfile(element, pokemon) {
    element.preventDefault();
    dispatch(handlePokemonDetails(pokemon));
    dispatch(handleModal());
  }

  if (!pokeName || !pokeImg || !pokeOrder) return <LoadingPokeball />;

  return (
    <div
      onClick={(el) => handlePokemonProfile(el, pokeDetails)}
      className="pokemon-list-container"
    >
      <img src={pokeImg} alt={pokeName} height={200} width={200} />

      <span>
        N°
        {zeroLeft(pokeOrder)}
      </span>
      <span>{capitalizeFirstLetter(pokeName)}</span>
    </div>
  );
}

ListedPokemon.defaultProps = {
  pokeDetails: {},
  pokeName: '',
  pokeImg: '',
  pokeOrder: 0,
};

ListedPokemon.propTypes = {
  pokeDetails: PropTypes.object,
  pokeName: PropTypes.string,
  pokeImg: PropTypes.string,
  pokeOrder: PropTypes.number,
};
