

import { useState, useEffect } from 'react';


export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface GetDogs<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useGetDogs(): GetDogs<Dog[]> {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const url = 'https://frontend-take-home-service.fetch.com/dogs';

    const resultIds = [
        "VXGFTIcBOvEgQ5OCx40W",
        "V3GFTIcBOvEgQ5OCx40W",
        "WHGFTIcBOvEgQ5OCx40W",
        "W3GFTIcBOvEgQ5OCx40W",
        "YnGFTIcBOvEgQ5OCx40W",
        "Y3GFTIcBOvEgQ5OCx40W",
        "aHGFTIcBOvEgQ5OCx40W",
        "aXGFTIcBOvEgQ5OCx40W",
        "bHGFTIcBOvEgQ5OCx40W",
        "bnGFTIcBOvEgQ5OCx40W",
        "cXGFTIcBOvEgQ5OCx40W",
        "c3GFTIcBOvEgQ5OCx40W",
        "dHGFTIcBOvEgQ5OCx40W",
        "dnGFTIcBOvEgQ5OCx40W",
        "eHGFTIcBOvEgQ5OCx40W",
        "h3GFTIcBOvEgQ5OCx40W",
        "iHGFTIcBOvEgQ5OCx40W",
        "jnGFTIcBOvEgQ5OCx40W",
        "j3GFTIcBOvEgQ5OCx40W",
        "kHGFTIcBOvEgQ5OCx40W",
        "rXGFTIcBOvEgQ5OCx40W",
        "uHGFTIcBOvEgQ5OCx40W",
        "vnGFTIcBOvEgQ5OCx40W",
        "yHGFTIcBOvEgQ5OCx40W",
        "0XGFTIcBOvEgQ5OCx40W"
      ];

    useEffect(() => {

      const fetchData = async () => {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(resultIds),
          });
          const jsonData = await response.json();
        //   console.log(response);
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


  export default useGetDogs;