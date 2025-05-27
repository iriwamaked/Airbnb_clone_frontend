import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/App.module.css'; // Глобальные стили
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css'; 

import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = "166836224378-puipacpt3cjmij8irmengvdsfbvjg6jn.apps.googleusercontent.com";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
  <App />
</GoogleOAuthProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
