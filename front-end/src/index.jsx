import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './utils/styles/GlobalStyle';
import { AppProvider, ConnectionProvider } from './utils/context';

import './index.css';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Settings from './pages/Settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <AppProvider>
      <ConnectionProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path='/login' element={<SignUp />} />
          <Route path='/forgotPassword' element={<SignUp />} />
          <Route path='/resetPassword/:token' element={<SignUp />} />
          <Route path='/login' element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </ConnectionProvider>
      </AppProvider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

