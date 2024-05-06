import React, { createContext, useContext, useState, useEffect } from "react";
import create from "../../api/crud/create";
import apiClient from "../../api/apiClient";


type Avatar = {
  url: string;
  alt: string;
};

type Banner = {
  url: string;
  alt: string;
};

type User = {
  email: string;
  token: string;
  name: string;
  avatar: Avatar;
  banner: Banner;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    console.warn("Login function not implemented.");
  },
  logout: () => {
    console.warn("Logout function not implemented.");
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const storedUser = JSON.parse(userData);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedUser.token}`;
        setUser(storedUser);
      } catch (error) {
        console.error('Error setting authorization and restoring user data:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await create("/auth/login", { email, password });
      if (!response || !response.accessToken) {
        throw new Error("Login failed or no access token received");
      }

      const { email: userEmail, accessToken, name, avatar, banner } = response;

      const newUser = { email: userEmail, token: accessToken, name, avatar: {url: avatar.url, alt: avatar?.alt }, banner: { url: banner.url, alt: banner?.alt } };

      localStorage.setItem('userData', JSON.stringify(newUser));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setUser(newUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
