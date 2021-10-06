import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/Store';
import axios from 'axios';

axios.defaults.baseURL = "http://ec2-3-136-85-7.us-east-2.compute.amazonaws.com"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);


