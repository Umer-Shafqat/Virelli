import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import StoreContextProvider from "./Context/StoreContext/StoreContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

//ROOT RENDER
root.render(
  <HashRouter>
      <StoreContextProvider>
    <App />
  </StoreContextProvider>
  </HashRouter>
);

reportWebVitals();
