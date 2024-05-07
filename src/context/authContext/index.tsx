import React, { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent} from 'react';
import { User } from "../../types";
import { authAPI } from "../../api/auth";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const newUser = await authAPI.login({ email, password });
            localStorage.setItem('userData', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('userData');
        setUser(null);
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const newUser = await authAPI.register({ name, email, password });
            localStorage.setItem('userData', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};


