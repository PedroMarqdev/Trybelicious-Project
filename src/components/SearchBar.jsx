import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions';

function SearchBar({ location }) {
  const [searchValue, setSearchValue] = useState('');
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const searchValueChange = ({ target }) => setSearchValue(target.value);
  const radioChangeValue = ({ target }) => setInput(`${target.id}`);

  const searchTypeFunc = () => {
    switch (input) {
    case 'name':
      return location === '/comidas'
        ? dispatch(Actions.retrieveNameRecipes(searchValue))
        : dispatch(Actions.retrieveDrinkNameRecipes(searchValue));
    case 'firstLetter':
      if (searchValue.length > 1) {
        // eslint-disable-next-line no-alert
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else if (location === '/comidas') {
        dispatch(Actions.retrievefirstLetterRecipes(searchValue));
      } else dispatch(Actions.retrieveDrinkFirstLetterRecipes(searchValue));
      break;
    default:
      return location === '/comidas'
        ? dispatch(Actions.retrieveIngredientRecipes(searchValue))
        : dispatch(Actions.retrieveDrinkIngredientRecipes(searchValue));
    }
  };

  return (
    <form className="transition-all w-11/12 duration-500">
      <div className="flex mt-4 w-full justify-start items-center">
        <label className="w-full lg:w-8/12" htmlFor="searchBar">
          <input
            className="w-full border-2 text-sm lg:text-lg border-black h-8 rounded-lg text-start lg:text-center font-montserrat focus:outline-none"
            data-testid="search-input"
            type="text"
            id="searchBar"
            value={ searchValue }
            onChange={ searchValueChange }
            placeholder="Pesquise aqui!"
          />
        </label>
        <button
          className="relative border-2 border-black rounded-full my-auto hover:text-amber-600 -left-10 focus:outline-none"
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchTypeFunc }
        >
          <FontAwesomeIcon icon={ faArrowAltCircleRight } size="3x" className="" />
        </button>
      </div>

      <div className="flex flex-col font-montserrat text-trueGray-800 w-11/12 lg:flex-row justify-between lg:w-2/5">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            onChange={ radioChangeValue }
            id="ingredient"
            name="search-type"
            type="radio"
            value=""
          />
          Ingredientes
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            id="name"
            onChange={ radioChangeValue }
            name="search-type"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            onChange={ radioChangeValue }
            id="firstLetter"
            name="search-type"
            type="radio"
          />
          Primeira letra
        </label>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  location: PropTypes.string.isRequired,
};

export default SearchBar;
