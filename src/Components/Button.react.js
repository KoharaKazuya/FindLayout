import React from 'react';
import styles from '../styles/button.css';

const Button = props => (
  <button
    className={styles[props.type]}
    style={props.style}
    type="button"
    onClick={props.onClick}
  >{props.text}</button>
);

Button.propTypes = {
  type: React.PropTypes.oneOf([
    'floating', 'raised', 'flat', 'denseFlat',
  ]).isRequired,
  style: React.PropTypes.object,
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
