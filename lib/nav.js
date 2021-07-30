import { useState } from 'react';
const { createContext, useContext } = require('react');

const navContext = createContext();

export function NavProvider({ children }) {
  const nav = useAppNavigation();
  return <navContext.Provider value={nav}>{children}</navContext.Provider>;
}

export const useNav = () => {
  return useContext(navContext);
};

function useAppNavigation() {
  const [active, setActive] = useState({ route: 'inbox', type: null });

  const navigate = (param) => {
    setActive({ ...active, route: param, type: null });
  };

  const setType = (param) => {
    setActive({ ...active, type: param });
  };

  return { active, navigate, setType };
}
