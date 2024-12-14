import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../api/api';
import { AxiosError } from 'axios';

interface UseFetchData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>; // Expose fetchData to refresh data
}

const useFetchData = <T,>(endpoint: string, id?: string | number): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading before fetching
    try {
      const url = id ? `${endpoint}/${id}` : endpoint;
      const response = await axiosInstance.get<T>(url);
      setData(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setData(null);
    } finally {
      setLoading(false); // Reset loading after fetch
    }
  }, [endpoint, id]);

  useEffect(() => {
    fetchData(); // Automatically fetch data when the component mounts or dependencies change
  }, [fetchData]);

  return { data, loading, error, fetchData };
};

export default useFetchData;
