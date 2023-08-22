import { useEffect, useState } from "react";

interface GetDogBreeds<T> {
  data: string[] | null;
  loading: boolean;
  error: Error | null;
}

function useGetDogBreeds(): GetDogBreeds<string[]> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const jsonData = await response.json();

      if (!response.ok) {
        setError(error);
        setLoading(false);
        throw new Error("Request failed");
      }
      setData(jsonData);
      setLoading(false);
    };

    fetchData();
  }, [error, url]);

  return { data, loading, error };
}

export default useGetDogBreeds;
