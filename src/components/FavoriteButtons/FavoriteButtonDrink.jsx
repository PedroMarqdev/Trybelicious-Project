import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import * as Actions from '../../actions/index';

function FavoriteButtonDrink({ id, fetchAgain, testId, setTrue }) {
  const [favorite, setFavorite] = useState(false);
  const { detailsDrink } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    const retriveFavoriteState = () => {
      const atualLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      return setFavorite(atualLocalStorage.find((local) => local.id === id));
    };
    retriveFavoriteState();
  }, [id]);

  useEffect(() => {
    if (fetchAgain) {
      dispatch(Actions.retrieveDrinkDetailsById(id));
    }
  }, [id, dispatch, fetchAgain]);

  const favoriteFunc = () => {
    const {
      idDrink,
      strCategory: category,
      strDrink: name,
      strDrinkThumb: image,
      strAlcoholic: alcoholicOrNot,
    } = detailsDrink[0];
    const favoriteObj = [
      {
        id: idDrink,
        type: 'bebida',
        area: '',
        category,
        alcoholicOrNot,
        name,
        image,
      },
    ];
    const localStoreFav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      const removedRecipe = localStoreFav.filter((result) => result.id !== id);
      const removedRecipeStringfy = JSON.stringify(removedRecipe);
      setFavorite(false);
      localStorage.setItem('favoriteRecipes', removedRecipeStringfy);
      if (setTrue !== undefined) setTrue();
    } else {
      setFavorite(true);
      const newRecipeStringfy = JSON.stringify([
        ...favoriteObj,
        ...localStoreFav,
      ]);
      localStorage.setItem('favoriteRecipes', newRecipeStringfy);
    }
  };

  if (!detailsDrink[0]) return <h1>Loading...</h1>;

  return (
    <div>
      <button
        className="focus:outline-none"
        onClick={ favoriteFunc }
        type="button"
      >
        {favorite ? (
          <FontAwesomeIcon
            className="transform hover:scale-105"
            size="2x"
            icon={ faHeart }
          />
        ) : (
          <FontAwesomeIcon
            className="transform hover:scale-105"
            size="2x"
            icon={ faRegularHeart }
          />
        )}
      </button>
    </div>
  );
}

FavoriteButtonDrink.propTypes = {
  id: PropTypes.string,
  fetchAgain: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  testId: PropTypes.string,
  setTrue: PropTypes.func.isRequired,
};

FavoriteButtonDrink.defaultProps = {
  testId: 'favorite-btn',
  fetchAgain: false,
  id: '',
};

export default FavoriteButtonDrink;
