

const useGetDogBreeds = async () => {
    const url = 'https://frontend-take-home-service.fetch.com/dogs/breeds';
  
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const result = await response.json();
   } else {
      console.error(response.status);
    } 

    return response;
  };