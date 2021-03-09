import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

function ReturnButton({ path, color }) {
  return (
    <button className="transform hover:scale-110 duration-500 flex m-4 justify-center w-auto h-auto items-center"type="button">
      <Link className="link w-auto h-auto"to={ path }>
        <FontAwesomeIcon size="3x" className={`fill ${color}  w-auto h-12 p-2 bg-white rounded-full`} icon={ faHandPointLeft } />
      </Link>
    </button>
  );
}

ReturnButton.propTypes = {
  path: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ReturnButton;
