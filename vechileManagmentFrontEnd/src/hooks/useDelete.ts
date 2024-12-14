import { useState } from 'react';
import axiosInstance from '../api/api';

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/delete/${id}`); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteById, loading, error };
};

export default useDelete;
