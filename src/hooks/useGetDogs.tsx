import { useState, useEffect } from "react";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface GetDogs<Dog> {
  data: Dog | null;
  loading: boolean;
  error: Error | null;
}

function useGetDogs(filterBreeds: string[], pageIndex: number): GetDogs<Dog[]> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "https://frontend-take-home-service.fetch.com/dogs";

  const pageGroupString = "?size=25&from=" + pageIndex * 25; // multiply the inde by 25 to for each page

  const filterBreedsString =
    filterBreeds?.length > 0 ? "&breeds=" + filterBreeds.join("&breeds=") : "";

  useEffect(() => {
    const fetchData = async () => {
      const searchRequest = await fetch(
        baseUrl + "/search" + pageGroupString + filterBreedsString,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const searchResponse = await searchRequest.json();

      const response = await fetch(baseUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchResponse.resultIds),
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
  }, [baseUrl, filterBreedsString, pageIndex]);

  return { data, loading, error };
}

export default useGetDogs;
