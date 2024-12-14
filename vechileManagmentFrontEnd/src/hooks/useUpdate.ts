import { useState } from 'react';
import axiosInstance from '../api/api';

const useUpdate = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: T) => {
    setLoading(true);
    setError(null);
    try {
      console.log(data)
      await axiosInstance.put<T>(`/edit/${id}`, data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

export default useUpdate;
