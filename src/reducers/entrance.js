const actionTypes = require('../actionTypes');

function entrance(state = { room: null }, action) {
  switch (action.type) {
    case actionTypes.UPDATE_ROOM: {
      return Object.assign({}, state, { room: action.roomId });
    }
    default:
      return state;
  }
}

module.exports = entrance;
