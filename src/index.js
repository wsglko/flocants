import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

//import reportWebVitals from './reportWebVitals';
const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain="dev-weu5hocb.jp.auth0.com"
    clientId="GgFpNPluUlB4jmQTctZPljTrtXyArNLy"
    redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
