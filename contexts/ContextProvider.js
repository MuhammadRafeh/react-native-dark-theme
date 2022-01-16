import React, { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <AuthContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAppContext = () => useContext(AuthContext);
