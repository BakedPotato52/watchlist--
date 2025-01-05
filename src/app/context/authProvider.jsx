'use client'
import { getUserData } from "@/lib/getUserData";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

function AuthProviders({ children }) {
    // State to track the Users Data
    const [user, setUser] = useState();
    console.log("user is", user);

    let userId = "cm5gc8eif000077tgvtldn85o";

    useEffect(() => {
        async function loadUserData() {
            const userData = await getUserData(userId)
            setUser(userData)
        }
        loadUserData()
    }, []);

    return (
        <Context.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </Context.Provider>
    );
}



export const ConstState = () => {
    return useContext(Context);
};
export default AuthProviders;