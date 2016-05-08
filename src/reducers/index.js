const entrance = require('./entrance');
const editor = require('./editor');

function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return {
        entrance: entrance(state.entrance, action),
        editor: editor(state.editor, action),
      };
  }
}

module.exports = reducer;
