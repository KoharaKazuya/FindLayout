import React from 'react';

const style = {
  '-webkit-appearance': 'none',
  border: 'none',
  background: 'none',
};

const ColorPicker = props => (
  <input
    style={style}
    type="color"
    value={props.value}
    onChange={e => props.onChange(e.currentTarget.value)}
  />
);

ColorPicker.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

ColorPicker.defaultProps = {
  value: '#000000',
  onChange: () => {},
};

export default ColorPicker;
