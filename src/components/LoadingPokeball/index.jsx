import React from 'react';
import pokeballImg from '../../assets/pokeball.svg';
import './styles.scss';

export function LoadingPokeball() {
  return (
    <div className="pokeball-container">
      <img
        className="bounce"
        src={pokeballImg}
        alt="Pokeball"
        height={110}
        width={110}
      />
    </div>
  );
}
