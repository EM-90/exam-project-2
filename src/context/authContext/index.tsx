import React, { createContext, useContext, useState } from "react";
import create from "../../api/crud/create";
import apiClient from "../../api/apiClient";

type User = {
    email: string;
    token: string;
  }
  
  type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  };

  const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { console.warn("Login function not implemented."); },
    logout: () => { console.warn("Logout function not implemented."); }
  });  

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [user, setUser] = useState<User | null>(null);
    let accessToken = '';

    const login = async (email: string, password: string) => {
      try {

        const response = await create("/auth/login", {email, password })

        if(!response){
            throw new Error("Login failed");
        }
            
        setUser({
        email: response.email,  
        token: response.token
        });

    
        accessToken = response.accessToken;
        localStorage.setItem('token', accessToken);
        //apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        
        


      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }

    const logout = () => {
        
        setUser(null);
        localStorage.removeItem('token');
        // delete apiClient.defaults.headers.common['Authorization'];
      
        
      };

      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
      
}