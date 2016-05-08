import { connect } from 'react-redux';
import Entrance from '../Components/Entrance.react';
import { joinRoom } from '../actions/entranceActions';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectRoom: roomId => dispatch(joinRoom(roomId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entrance);
