import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ onClick, children }) {
  return (
    <button className="bg-slate-500" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
