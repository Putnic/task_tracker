import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

import { loadUser } from './store/actions/authActions';
import App from './App';

// Authentication on page reload
if (localStorage.getItem('token')) {
  // console.log('index.js', store.getState());
  store.dispatch(loadUser());
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
