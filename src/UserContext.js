import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [links, setLinks] = useState([]);
  return (
    <UserContext.Provider value={{user, setUser, links, setLinks}}>
      {children}
    </UserContext.Provider>
  );
};