import { useEffect, useState } from "react";

const useGetDogMatch = (dogsIds: string[]) => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";

  const [data, setData] = useState<string[]>([""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const match = async () => {
      const response = await fetch(baseUrl + "/dogs/match", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogsIds),
      });
      response.ok ? setData(await response.json()) : setError(response.status);
      setLoading(false);
    };
    match();
  }, [dogsIds]);

  return { data, error, loading };
};

export default useGetDogMatch;
