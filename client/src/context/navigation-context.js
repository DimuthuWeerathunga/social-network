import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavigationContext = createContext({
    currentlyActiveNav: 'new',
    handleNavClick: (e) => {
    }
});

const NavContextProvider = ({ children }) => {

    const [currentlyActiveNav, setCurrentlyActiveNav] = useState('new');
    const navigate = useNavigate();
    const location = useLocation();

    function handleNavClick(e) {
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
            default:
                navigate('/');
        }
    }

    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        let lastPathSegment = pathSegments[pathSegments.length - 1];
        if (!lastPathSegment) {
            lastPathSegment = 'new';
        }
        setCurrentlyActiveNav(lastPathSegment);
    }, [location]);


    return <NavigationContext.Provider value={{ currentlyActiveNav, handleNavClick }}>
        {children}
    </NavigationContext.Provider>;
};

export default NavContextProvider;
