import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

interface NavigationContextType {
  currentlyActiveNav: string;
  handleNavClick: MenuProps['onClick'];
}

export const NavigationContext = createContext<NavigationContextType>({
  currentlyActiveNav: 'new', handleNavClick: undefined
});


const NavContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [currentlyActiveNav, setCurrentlyActiveNav] = useState<string>('new');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick: MenuProps['onClick'] = (e) => {
    console.log(e.key);
    // setCurrentlyActiveNav(e.key);

    switch (e.key) {
      case 'new':
        navigate('/');
        break;
      case 'topics':
        navigate('/topics');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'signup':
        navigate('/signup');
        break;
      case 'people':
        navigate('/people');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        navigate('/');
    }
  };

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    let lastPathSegment = pathSegments[pathSegments.length - 1];
    if (!lastPathSegment) {
      lastPathSegment = 'new';
    }
    setCurrentlyActiveNav(lastPathSegment);
  }, [location]);


  return (
    <NavigationContext.Provider value={{ currentlyActiveNav, handleNavClick }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavContextProvider;
