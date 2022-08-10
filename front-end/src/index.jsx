import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './utils/styles/GlobalStyle';
import { ConnectionProvider } from './utils/context';

import './index.css';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ConnectionProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path='/login' element={<SignUp />} />
        </Routes>
      </ConnectionProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

