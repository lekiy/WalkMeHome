import { useState, useEffect } from 'react';


export interface SearchResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

interface GetDogSearch<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useGetDogSearch(): GetDogSearch<SearchResponse> {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const url = 'https://frontend-take-home-service.fetch.com/dogs/search';

    useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
          });
          const jsonData = await response.json();

          if (!response.ok) {
            setError(error);
            setLoading(false);
            throw new Error('Request failed');
             
          }
          setData(jsonData);
          setLoading(false);
      };
  
      fetchData();
    }, [url]);

  return { data, loading, error };

  };


  export default useGetDogSearch;