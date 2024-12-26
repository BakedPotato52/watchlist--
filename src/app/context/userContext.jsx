'use client'
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUp = (userData) => {
        // Implement sign up logic here
        setUser(userData);
    };

    const signIn = (userData) => {
        // Implement sign in logic here
        setUser(userData);
    };

    const signOut = () => {
        // Implement sign out logic here
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, signUp, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};