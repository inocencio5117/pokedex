/* eslint-disable react/jsx-one-expression-per-line */
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
          />

          <div className="modal-info">
            <div className="modal-stats">
              {pokemonDetails?.stats?.map((item) => (
                <div>
                  <span className="stat-name">
                    {capitalizeFirstLetter(item.stat.name)}:
                  </span>
                  <span className="stat-value">{item.base_stat}</span>
                </div>
              ))}
            </div>
            <div className="modal-types">
              <h3>Types:</h3>
              {pokemonDetails?.types?.map((item) => (
                <span className={item.type.name}>
                  {capitalizeFirstLetter(item.type.name)}
                </span>
              ))}
            </div>
            <div className="modal-dimensions">
              <div>
                <span>Weight:</span>
                {pokemonDetails.height.toString().concat('0')} cm
              </div>
              <div>
                <span>Height:</span>
                {pokemonDetails.weight.toString().concat('0')} g
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
