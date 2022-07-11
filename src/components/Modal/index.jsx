import React from 'react';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';

import { zeroLeft } from '../../utils/zeroLeft';
import { capitalizeFirstLetter } from '../../utils/capitalize';

import { handleModal } from '../../features/modal/handleModal';

export function Modal() {
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const pokemonDetails = useSelector((state) => state.modal.pokemonDetails);
  const dispatch = useDispatch();

  function handleModalClose(element) {
    element.preventDefault();
    dispatch(handleModal());
  }

  if (!isModalOpen) return null;

  return (
    <div key={`${pokemonDetails}_modal`} className="modal-overlay">
      <div className="modal-container">
        <button
          type="button"
          className="modal-close-button"
          onClick={handleModalClose}
        >
          X
        </button>
        <div className="modal-header">
          <h2>{capitalizeFirstLetter(pokemonDetails.name)}</h2>
          <span>
            N°
            {zeroLeft(pokemonDetails.order)}
          </span>
        </div>

        <div className="modal-body">
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
            height={250}
            width={250}
          />

          <div className="modal-types">
            {pokemonDetails.types.map((item) => (
              <span>{item.type.name}</span>
            ))}
          </div>

          <div className="modal-stats">
            <span>
              Height:
              {pokemonDetails.height}
            </span>
            <span>
              Weight
              {pokemonDetails.weight}
            </span>
            {pokemonDetails.stats.map((item) => (
              <span>
                {item.stat.name}
                {item.base_stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
