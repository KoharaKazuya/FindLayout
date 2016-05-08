import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducer from './reducers';
import App from './Containers/App';

const socket = io();
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);

store.subscribe(() => console.log(store.getState()));
