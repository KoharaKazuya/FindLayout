import React from 'react';
import { connect } from 'react-redux';
import Entrance from './Entrance';
import Editor from './Editor';

const App = props => (
  <div className="App">
    {props.inRoom ?
      <Editor />
    :
      <Entrance />
    }
  </div>
);

App.propTypes = {
  inRoom: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    inRoom: Boolean(state.entrance.room),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
