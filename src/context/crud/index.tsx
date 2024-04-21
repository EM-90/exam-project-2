import React, { ReactNode, createContext, useContext, useState } from 'react';
import { baseLink } from '../../api/linkConst/Index';

interface DataItem {
    id: number;
    
  }
  
  interface CrudContextState {
    data: DataItem[];
    loading: boolean;
    error: any; 
    fetchData: () => Promise<void>;
    addItem: ( endpoint: string, newItem: any) => Promise<void>; 
    updateItem: (endpoint: string, id: number, updatedItem: any) => Promise<void>;
    deleteItem: (endpoint: string, id: number) => Promise<void>;
  }
  
  const CrudContext = createContext<CrudContextState | undefined>(undefined);

export const CrudProvider:React.FC<{children: ReactNode}> = ({ children }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const apiUrl = baseLink;

  // fetchdata function (R)


  const fetchData = async (endpoint: string ='') => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl + endpoint);
      const jsonData = await response.json();
      setData(jsonData.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // addItem function (C)

  const addItem = async (endpoint: string ='', newItem: any) => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      const responseData = await response.json();
      setData([...data, responseData]);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

 // updateItem function (U)

  const updateItem = async (endpoint: string ='', id: number, updatedItem: any) => {
    try {
      setLoading(true);
      const response = await fetch(`${endpoint}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
      const updatedData = await response.json();
      const newData = data.map(item => (item.id === id ? updatedData : item));
      setData(newData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  //deleteItem function (D)

  const deleteItem = async (endpoint: string ='', id: number) => {
    try {
      setLoading(true);
      await fetch(`${endpoint}${id}`, {
        method: 'DELETE',
      });
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const value: CrudContextState = {
    data,
    loading,
    error,
    fetchData,
    addItem,
    updateItem,
    deleteItem,
  };

  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

export const useCrud = (): CrudContextState => {
  const context = useContext(CrudContext);
  if (!context) {
    throw new Error('useCrud must be used within a CrudProvider');
  }
  return context;
};

