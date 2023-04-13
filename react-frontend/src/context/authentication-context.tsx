import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextModel {
    isLoggedIn: boolean;
    token?: string;
    onLogout?: () => void;
    onLogin?: (token: string) => void;
}

export const AuthContext = React.createContext<AuthContextModel>({
    isLoggedIn: false,
});

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
            setToken(localStorage.getItem('token') || '');
        }
    }, []);

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
    };

    const loginHandler = (token: string) => {
        setIsLoggedIn(true);
        setToken(token);
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('token', token);
        navigate('/');
    };

    return (
      <AuthContext.Provider
        value={{
            isLoggedIn,
            token,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}
      >
          {props.children}
      </AuthContext.Provider>
    );
};

export default AuthContextProvider;
