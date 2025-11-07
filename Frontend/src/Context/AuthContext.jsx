import React, { createContext, useState, useEffect, Children } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token && username) {
            setUser({ username, token });
        }
    }, []);

    const login = (username, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setUser({ username, token })
    }

    const Logout = () => {
        localStorage.clear();
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}
