'use client'

import { createContext, useContext, useReducer, } from 'react';
import { authReducer, initialState, } from '@/app/reducers/authReducer';
import { handleSignIn, handleSignUp, } from '@/app/actions/auth';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                handleSignIn: handleSignIn(dispatch),
                handleSignUp: handleSignUp(dispatch)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
