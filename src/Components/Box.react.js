import React from 'react';
import DelayInput from './DelayInput.react';

const Box = props => {
  const style = {
    left: props.x,
    top: props.y,
    width: props.width,
    height: props.height,
    zIndex: props.zindex,
    position: 'absolute',
    backgroundColor: props.backgroundColor,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, .1)',
    opacity: props.unselected ? 0.5 : 1,
  };
  const textStyle = {
    display: props.width >= props.fontSize && props.height >= props.fontSize ? 'block' : 'none',
    border: 'none',
    position: 'absolute',
    left: 0,
    width: '100%',
    top: '50%',
    transform: 'translate(0, -50%)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: props.textColor,
    fontSize: props.fontSize,
  };

  return (
    <div data-box-id={props.id} style={style}>
      <DelayInput
        value={props.text}
        onDetermine={value => props.onChangeText(value)}
        style={textStyle}
      />
    </div>
  );
};

Box.propTypes = {
  id: React.PropTypes.number.isRequired,
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  zindex: React.PropTypes.number,
  text: React.PropTypes.string,
  fontSize: React.PropTypes.number,
  textColor: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  onChangeText: React.PropTypes.func,
  unselected: React.PropTypes.bool,
};

Box.defaultProps = {
  text: '',
  fontSize: 24,
  textColor: '#333',
  backgroundColor: '#FFF',
  onChangeText: () => {},
  unselected: false,
};

export default Box;
