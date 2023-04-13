import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import NavContextProvider from './context/navigation-context';
import AppLayout from './layout/AppLayout';
import ThreadPage from './pages/ThreadPage';
import NewThreadsPage from './pages/NewThreadsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddNewThreadPage from './pages/AddNewThreadPage';

import './App.css';
import ExploreFriendsPage from './pages/ExploreFriendsPage';
import ExploreTopicsPage from './pages/ExploreTopicsPage';
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR } from './global-settings/colors';
import AuthContextProvider from './context/authentication-context';

const App: FC = () => {
  return (
    <AuthContextProvider>
      <NavContextProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: PRIMARY_COLOR,
              colorText: PRIMARY_TEXT_COLOR,
              colorTextHeading: PRIMARY_COLOR
            }
          }}
        >
          <Routes>
            <Route path='/' element={<AppLayout />}>
              <Route path='' element={<NewThreadsPage />}></Route>
              <Route path='topics' element={<ExploreTopicsPage />}></Route>
              <Route
                path='categories/thread/:threadId'
                element={<ThreadPage />}
              ></Route>
              <Route
                path='categories/new-thread'
                element={<AddNewThreadPage />}
              ></Route>
              <Route path='people' element={<ExploreFriendsPage />}></Route>
              <Route path='login' element={<LoginPage />}></Route>
              <Route path='signup' element={<SignUpPage />} />
            </Route>
          </Routes>
        </ConfigProvider>
      </NavContextProvider>
    </AuthContextProvider>
  );
};

export default App;
