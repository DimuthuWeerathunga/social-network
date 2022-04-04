import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AppLayout from './layout/AppLayout';
import ThreadPage from './pages/ThreadPage';
import MainPage from './pages/MainPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddNewThreadPage from './pages/AddNewThreadPage';

import './App.css';

function App() {
  const [currentlyActiveNav, setCurrentlyActiveNav] = useState('new');
  const navigate = useNavigate();

  function handleNavClick(e) {
    // console.log(e.key);
    setCurrentlyActiveNav(e.key);

    switch (e.key) {
      case 'new':
        navigate('/');
        break;
      case 'categories':
        navigate('/categories');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'signup':
        navigate('/signup');
        break;
      default:
        navigate('/');
    }
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <AppLayout
            currentlyActiveNav={currentlyActiveNav}
            setCurrentlyActiveNav={setCurrentlyActiveNav}
            handleNavClick={handleNavClick}
          />
        }
      >
        <Route path='' element={<MainPage />}></Route>
        <Route path='categories' element={<CategoriesPage />}></Route>
        <Route path='categories/thread' element={<ThreadPage />}></Route>
        <Route path='newThread' element={<AddNewThreadPage />}></Route>
      </Route>
      <Route
        path='login'
        element={
          <LoginPage
            currentlyActiveNav={currentlyActiveNav}
            setCurrentlyActiveNav={setCurrentlyActiveNav}
            handleNavClick={handleNavClick}
          />
        }
      ></Route>
      <Route
        path='signup'
        element={
          <SignUpPage
            currentlyActiveNav={currentlyActiveNav}
            setCurrentlyActiveNav={setCurrentlyActiveNav}
            handleNavClick={handleNavClick}
          />
        }
      />
    </Routes>
  );
}

export default App;
