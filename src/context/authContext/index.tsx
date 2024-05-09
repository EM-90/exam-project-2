import React, { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent } from 'react';
import { User } from "../../types";
import { authAPI } from "../../api/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data:", e);
                setError("Failed to load user data.");
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await authAPI.login({ email, password });
            localStorage.setItem('userData', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setLoading(true);
        localStorage.removeItem('userData');
        setUser(null);
        setLoading(false);
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await authAPI.register({ name, email, password });
            localStorage.setItem('userData', JSON.stringify(newUser));
            setUser(newUser);
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};


