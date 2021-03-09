import React from 'react';
import PropTypes from 'prop-types';

function DrinkIngredientsList({ progressRecipes, id, setCheck, getCheck }) {
  const handleStorageRemove = (name) => {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        cocktails: {
          ...progressStorage.cocktails,
          [id]: [
            ...progressStorage.cocktails[id].filter((element) => element !== name),
          ],
        },
      }),
    );
  };

  const handleStorageAdd = (name) => {
    const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...progressStorage,
        cocktails: {
          ...progressStorage.cocktails,
          [id]: [...progressStorage.cocktails[id], name],
        },
      }),
    );
  };

  const handleStorage = (name, checked) => {
    if (!checked) {
      handleStorageRemove(name);
    } else {
      handleStorageAdd(name);
    }
  };

  const handleChange = ({ target }) => {
    const { name, checked } = target;
    setCheck({
      ...getCheck,
      [name]: checked,
    });
    handleStorage(name, checked);
  };

  const returnCheckbox = (element) => {
    const progressStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes')).cocktails[id] || [];
    const filterProgress = progressStorage.some((ingredient) => element === ingredient);
    if (filterProgress) {
      return (
        <input
          className="border-transparent rounded-full w-5 h-5"
          type="checkbox"
          name={ element }
          id={ element }
          onChange={ handleChange }
          checked
        />
      );
    }
    return (
      <input
        className="rounded-full w-5 h-5"
        type="checkbox"
        name={ element }
        id={ element }
        onChange={ handleChange }
      />
    );
  };

  return (
    <ul className="flex flex-col bg-white w-10/12 p-2 shadow-inner rounded-lg lg:bg-none font-montserrat font-bold lg:items-baseline">
      {progressRecipes.map((element, index) => (
        <li data-testid={ `${index}-ingredient-step` } key={ element }>
          {returnCheckbox(element)}
          <label className="text-2xl" htmlFor={ element }>{element}</label>
        </li>
      ))}
    </ul>
  );
}

DrinkIngredientsList.propTypes = {
  getCheck: PropTypes.objectOf(PropTypes.bool).isRequired,
  id: PropTypes.string.isRequired,
  progressRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCheck: PropTypes.func.isRequired,
};

export default DrinkIngredientsList;
