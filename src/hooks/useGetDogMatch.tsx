import { useEffect, useState } from "react";
import { Dog } from "./useGetDogs";

type MatchResponse = {
  match: string;
};

const useGetDogMatch = (dogsIds: string[]) => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";

  const [data, setData] = useState<Dog | null>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogMatch = async () => {
      const matchResponse = await fetch(baseUrl + "/dogs/match", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogsIds),
      });
      const matchJson: MatchResponse =
        (await matchResponse.json()) as MatchResponse;

      const dogResponse = await fetch(baseUrl + "/dogs", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([matchJson.match]),
      });

      const dogJson: Dog[] = (await dogResponse.json()) as Dog[];

      if (!dogJson) {
        setError("Could not fetch dogs");
      }

      setData(dogJson[0]);
      setLoading(false);
    };

    void fetchDogMatch();
  }, [dogsIds]);

  return { data, error, loading };
};

export default useGetDogMatch;
