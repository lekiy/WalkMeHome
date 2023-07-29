import { useState, useEffect } from "react";

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface GetLocations<Location> {
  data: Location | null;
  loading: boolean;
  error: Error | null;
}

function useGetLocations(zipCodes: string[]): GetLocations<Location[]> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "https://frontend-take-home-service.fetch.com/locations";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(zipCodes),
      });
      if (!response.ok) {
        setError(error);
        setLoading(false);
        throw new Error("Request failed");
      } else {
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  return { data, loading, error };
}

export default useGetLocations;
