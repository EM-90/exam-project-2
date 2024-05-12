import React, { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent } from 'react';
import { User } from "../../types";
import { authAPI } from "../../api/auth";
import apiClient from '../../api/apiClient';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    setUser: (user: User) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string, venueManager: boolean) => Promise<void>;
    saveUserToLocalStorage: (user: User) => void;
    getUserFromLocalStorage: () => User | null;
    removeUserFromLocalStorage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Utility functions to make updates not disapear after refreshing page

const saveUserToLocalStorage = (user: User) => {
    localStorage.setItem('userData', JSON.stringify(user));
};

const getUserFromLocalStorage = (): User | null => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('userData');
};

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (user) {
            saveUserToLocalStorage(user);
        }
    }, [user]);


    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await authAPI.login({ email, password });
            if (newUser && newUser.accessToken) {
                setUser(newUser);
                saveUserToLocalStorage(newUser);
            } else {
                throw new Error('Missing access token');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeUserFromLocalStorage();
        delete apiClient.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const register = async (name: string, email: string, password: string, venueManager: boolean ) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await authAPI.register({
                name, email, password,
                venueManager
            });
            if (newUser && newUser.accessToken) {
                setUser(newUser);
                saveUserToLocalStorage(newUser);
            } else {
                throw new Error('Missing access token');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
             user,
             setUser, 
             loading, 
             error, 
             login, 
             logout, 
             register, 
             saveUserToLocalStorage, 
             getUserFromLocalStorage, 
             removeUserFromLocalStorage }}>
            {children}
        </AuthContext.Provider>
    );
};






