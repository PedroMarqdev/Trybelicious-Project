import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CopyButton from '../components/CopyButton';
import FavoriteButtonFood from '../components/FavoriteButtons/FavoriteButtonFood';
import FavoriteButtonDrink from '../components/FavoriteButtons/FavoriteButtonDrink';

function FavoriteRecipes() {
  const [getRecipes, setRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRecipes(favoriteRecipes);
  }, []);

  const setTrue = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRecipes(favoriteRecipes);
  };

  const getFavoriteButton = (type, id, index) => {
    if (type === 'comida') {
      return (
        <FavoriteButtonFood
          id={ id }
          fetchAgain="true"
          testId={ `${index}-horizontal-favorite-btn` }
          setTrue={ setTrue }
        />
      );
    }
    return (
      <FavoriteButtonDrink
        id={ id }
        fetchAgain="true"
        testId={ `${index}-horizontal-favorite-btn` }
        setTrue={ setTrue }
      />
    );
  };

  const getCopyButton = (type, id, index) => {
    if (type === 'comida') {
      return (
        <CopyButton
          location={ `/comidas/${id}` }
          testId={ `${index}-horizontal-share-btn` }
        />
      );
    }
    return (
      <CopyButton
        location={ `/bebidas/${id}` }
        testId={ `${index}-horizontal-share-btn` }
      />
    );
  };

  const getAreaOrAlcoholic = (type, category, area, alcoholicOrNot) => {
    if (type === 'comida') {
      return `${area} - ${category}`;
    }
    return `${alcoholicOrNot}`;
  };

  const handleFilter = (type) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (type === 'comida') {
      setRecipes(
        favoriteRecipes.filter((element) => element.type === 'comida'),
      );
    } else if (type === 'bebida') {
      setRecipes(
        favoriteRecipes.filter((element) => element.type === 'bebida'),
      );
    } else {
      setRecipes(favoriteRecipes);
    }
  };

  return (
    <div className="main-container font-pacifico text-white bg-white">
      <div className="items-container">
        <div className="header-container bg-gradient-to-tr from-pink-400 to-pink-500">
          <Header title="Receitas Favoritas" search={ false } />
        </div>

        <div className="font-pacifico text-pink-500 flex w-4/5 flex-row justify-around">
          <button
            className="transform hover:scale-105 transition-all focus:outline-none bg-white m-2 h-10 rounded-xl shadow-xl w-1/3"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilter('all') }
          >
            All
          </button>
          <button
            className="transform hover:scale-105 transition-all focus:outline-none bg-white m-2 h-10 rounded-xl shadow-xl w-1/3"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilter('bebida') }
          >
            Drinks
          </button>
          <button
            className="transform hover:scale-105 transition-all focus:outline-none bg-white m-2 h-10 rounded-xl shadow-xl w-1/3"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => handleFilter('comida') }
          >
            Food
          </button>
        </div>

        <div className="flex w-screen flex-col justify-around items-center">
          {getRecipes.map((element, index) => (
            <div
              className="rounded-xl justify-between items-center flex-col w-10/12 lg:w-6/12 flex lg:flex-row text-center mt-2 font-pacifico text-trueGray-600 bg-white shadow-xl border-t-2 border-b-2 border-pink-600 my-4 "
              key={ element.id }
            >
              <div className="lg:w-2/5">
                <Link
                  className="link text-pink-500 hover:text-pink-500"
                  to={ `/${element.type}s/${element.id}` }
                >
                  <img
                    className="rounded-t-xl lg:rounded-t-none lg:rounded-l-xl w-full object-cover"
                    src={ element.image }
                    alt="teste"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
              </div>

              <div className="flex flex-col w-1/2 lg:mx-auto items-center jutisfy-between">
                <h1
                  className="text-4xl mt-2 text-pink-500 hover:text-pink-500"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {element.name}
                </h1>
                <h1
                  className="text-2xl mt-2 font-montserrat text-trueGray-600"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {getAreaOrAlcoholic(
                    element.type,
                    element.category,
                    element.area,
                    element.alcoholicOrNot,
                  )}
                </h1>
                <Link
                  className="link text-pink-500 hover:text-pink-500"
                  to={ `/${element.type}s/${element.id}` }
                />
                <div className="flex w-1/2 mx-auto justify-around items-baseline">
                  {getCopyButton(element.type, element.id, index)}
                  {getFavoriteButton(element.type, element.id, index)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
