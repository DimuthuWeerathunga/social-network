import { createContext } from 'react';

export const NavigationContext = createContext({
  currentlyActiveNav: 'new',
  handleNavClick: (e) => {},
});
