import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import CopyButton from './CopyButton';

function DoneFoodCard({ food, index }) {
  const { image, category, name, id, tags, area, doneDate } = food;
  return (
    <div className="flex bg-white w-11/12  mx-auto h-full my-8 rounded-lg flex-col shadow-xl lg:flex-row justify-between items-center">
      <div className="">
        <Link className="link" to={ `/comidas/${id}` }>
          <img
            className="object-cover lg:rounded-l-lg lg:rounded-t-none rounded-t-lg"
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="recipeImg"
          />
        </Link>
      </div>
      <div className="h-12 w-12 m-2 bg-amber-400 rounded-full">
        <CopyButton
          location={ `/comidas/${id}` }
          testId={ `${index}-horizontal-share-btn` }
        />
      </div>

      <div className="w-full h-auto flex text-sm justify-center items-center flex-col">
        <Link
          className="link text-amber-400 hover:text-amber-500"
          to={ `/comidas/${id}` }
        >
          <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
        </Link>
        <p className="font-montserrat font-bold text-trueGray-500" data-testid={ `${index}-horizontal-top-text` }>
          {`Categoria: ${area} - ${category}`}
        </p>
        <p className="font-montserrat font-bold text-trueGray-500" data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${doneDate}`}
        </p>
        {tags
          && tags.map((tagers) => (
            <p
              className="font-montserrat font-bold text-trueGray-500"
              key={ `${tagers}${index}` }
              data-testid={ `${index}-${tagers}-horizontal-tag` }
            >
              {tags}
            </p>
          ))}
      </div>
    </div>
  );
}

DoneFoodCard.propTypes = {
  food: PropTypes.shape({
    area: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    strMeal: PropTypes.string,
    tags: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneFoodCard;
