import apiClient from "../../apiClient";

const fetchData = async (endpoint: string) => {
    try {
      const response = await apiClient.get(endpoint);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  export default fetchData;
  