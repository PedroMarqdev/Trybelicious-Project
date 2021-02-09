import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MenuInferior from '../../components/MenuInferior';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import RecipeFoodCard from '../../components/RecipeCards/RecipeFoodCard';
import CategoryBar from '../../components/CategoryBar';
import * as Actions from '../../actions/index';

function Foods({ location }) {
  const { setter, setterIngredient } = useSelector((state) => state.user);
  const searchBarView = setter;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setterIngredient) dispatch(Actions.retrieveInitialRecipes());
  }, [dispatch, setterIngredient]);

  return (
    <div className="h-screen overflow-y-scroll w-screen min-w-screen min-h-screen bg-gradient-to-tr from-amber-300 to-amber-400">
      <div className="h-auto flex flex-column items-center mx-auto justify-center w-11/12">
        <div className="blur bg-clip-ppading border-b-4 border-t-4 m-4 w-10/12 border-white shadow-xl rounded-lg p-4 mx-auto">
          <Header title="Comidas" />
          {searchBarView && <SearchBar location={ location.pathname } />}
        </div>
        <CategoryBar type="foods" />
        <RecipeFoodCard />
        <MenuInferior />
      </div>
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Foods;
