import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import {Provider} from 'react-redux';
import {addMovie} from './actions/index';
import {toggleFav} from './actions/index';
import App from './components/App';

window.store = store;
window.addMovie = addMovie;
window.toggleFav = toggleFav;

// ========================================

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
