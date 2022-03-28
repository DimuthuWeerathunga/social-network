import AppLayout from './layout/AppLayout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import ThreadPage from './pages/ThreadPage';
import MainPage from './pages/MainPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='' element={<MainPage />}></Route>
          <Route path='categories' element={<CategoriesPage />}></Route>
          <Route path='categories/thread' element={<ThreadPage />}></Route>
        </Route>
        <Route path='login' element={<LoginPage />}></Route>
        <Route path='signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
