import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButtonFood from '../../components/FavoriteButtons/FavoriteButtonFood';
import FoodIngredientsList from '../../components/IngredientLists/FoodIngredientsList';
import ReturnButton from '../../components/ReturnButton';
import * as API from '../../services/foodApi';
import CopyButton from '../../components/CopyButton';
import Loading from '../../components/Loading';
import DoneRecipeButtonFood from '../../components/DoneRecipeButtons/DoneRecipeButtonFood';

function FoodRecipeProgress({ match, history }) {
  const [progressRecipes, setProgressRecipes] = useState([]);
  const [data, setData] = useState();
  const [instructionsShow, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [getCheck, setCheck] = useState({});
  const { params } = match;
  const { id } = params;
  const setInstructions = () => (instructionsShow ? setShow(false) : setShow(true));
  // useEffect para setar data da API
  // prettier-ignore
  useEffect(() => {
    const fetchApi = async () => {
      const response = await API.searchFoodByIdRequest(id);
      const filteredResponse = Object.entries(response.meals[0]).filter(
        (element) => element[0].includes('Ingredient')
        && element[1] !== ''
        && element[1] !== null,
      ).map((element) => element[1]);

      setProgressRecipes(filteredResponse);

      setData(response.meals);
      setLoading(false);
    };
    fetchApi();
  }, [id]);

  // useEffect para setar LocalStorage
  // prettier-ignore
  useEffect(() => {
    const emptySize = 0;

    const handleStorage = () => {
      const progressStorage = JSON
        .parse(localStorage
          .getItem('inProgressRecipes')) || { meals: '', cocktails: '' };
      if (progressRecipes.length !== emptySize && !progressStorage.meals[id]) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({
            ...progressStorage,
            meals: {
              ...progressStorage.meals,
              [id]: [],
            },
          }),
        );
      }
    };
    handleStorage();
  }, [id, progressRecipes]);

  if (loading) return <Loading bgColor="from-amber-300 to-amber-400" />;

  return (
    <div className="text-center w-screen h-auto flex-col lg:flex-row flex justify-center items-center font-montserrat lg:h-screen text-white min-w-screen min-h-screen bg-gradient-to-r from-amber-400 to-amber-500">
      <div className="flex flex-col h-full lg:flex-row mx-auto lg:w-10/12 lg:bg-white rounded-lg shadow-xl">
        <div className="flex w-auto h-auto lg:my-auto items-center justify-center flex-col">
          <div className="flex header-container bg-gradient-to-r from-amber-400 to-amber-500 flex-col lg:flex-row h-full w-10/12 lg:w-1/2 items-center justify-between">
            <ReturnButton color="text-amber-500" path={ `/comidas/${id}` } />
            <h1
              className="font-pacifico lg:mr-32 text-5xl"
              data-testid="recipe-title"
            >
              {data[0].strMeal}
            </h1>
          </div>

          <img
            className="rounded-lg w-4/5 p-2 bg-white lg:bg-gradient-to-r from-amber-400 to-amber-500 shadow-xl border-t-2 border-b-2 border-amber-600"
            src={ data[0].strMealThumb }
            alt="recipe-img"
            data-testid="recipe-photo"
          />
          <div className="lg:bg-gradient-to-r from-amber-400 to-amber-500 flex rounded-lg lg:shadow-lg m-4 w-1/5 justify-around items-center">
            <CopyButton location={ `/comidas/${id}` } />
            <FavoriteButtonFood id={ id } fetchAgain="true" />
          </div>

          <h3 className="lg:text-amber-400 mb-4" data-testid="recipe-category">{`Categoria: ${data[0].strCategory}`}</h3>
        </div>
        <div className="transition-all duration-500 flex h-auto lg:w-1/2  lg:h-screen text-amber-400 mx-auto my-auto items-center justify-around flex-col">
          <h1 className="header-container flex-none text-white text-3xl lg:bg-gradient-to-r from-amber-400 to-amber-500 font-pacifico">
            {' '}
            Checklist dos ingredientes !
          </h1>
          <FoodIngredientsList
            progressRecipes={ progressRecipes }
            id={ id }
            setCheck={ setCheck }
            getCheck={ getCheck }
          />
          <div className="border-l-2 border-r-2 border-b-2 border-white flex lg:overflow-y-auto flex-col mb-20 w-10/12 lg:w-1/2 bg-gradient-to-tr from-amber-400 to-amber-500 text-amber-500 rounded-xl shadow-xl">
            <button
              className="text-white font-bold border-t-2 border-b-2 border-white p-2 rounded-lg   focus:outline-none text-2xl"
              type="button"
              onClick={ setInstructions }
            >
              Instruções
            </button>
            {instructionsShow && (
              <p
                className="lg:h-screen/4 rounded-lg p-2  text-white"
                data-testid="instructions"
              >
                {data[0].strInstructions}
              </p>
            )}
          </div>
        </div>
      </div>
      <DoneRecipeButtonFood
        history={ history }
        id={ id }
        data={ data }
        progressRecipes={ progressRecipes }
      />
    </div>
  );
}

FoodRecipeProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FoodRecipeProgress;
