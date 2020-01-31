import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/redux/rootReducer';

import {BrowserRouter} from 'react-router-dom';

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )



ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
