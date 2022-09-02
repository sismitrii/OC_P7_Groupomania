import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './utils/styles/GlobalStyle';
import { AppProvider, ConnectionProvider } from './utils/context';

import './index.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Settings from './pages/Settings';
import Error from './pages/Error';
import Header from './components/Header';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <AppProvider>
      <ConnectionProvider>
        <GlobalStyle />
        <Header/>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profil/:id" element={<Profil />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer/>
      </ConnectionProvider>
      </AppProvider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

