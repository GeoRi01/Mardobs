import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const storeUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, storeUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
