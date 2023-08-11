import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GlobalStyle from './styles/global';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'wouter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div>
    <GlobalStyle />
    <App />
  </div>,
);
