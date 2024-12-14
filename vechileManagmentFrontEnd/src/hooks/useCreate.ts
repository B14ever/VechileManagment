import { useState } from 'react';
import axiosInstance from '../api/api';

const useCreate = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: T) => {
    setLoading(true);
    setError(null);
    try {
    
      await axiosInstance.post<T>('/add', data); 
    } catch (err : any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export default useCreate;
