import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import './styles/App.module.css'; // Глобальные стили


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider></HelmetProvider>
  // </React.StrictMode>
);
