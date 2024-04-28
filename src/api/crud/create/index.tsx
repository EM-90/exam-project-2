import apiClient from "../../apiClient";

const create = async (endpoint: string, data:any) => {

    try {
      const response = await apiClient.post(endpoint, data);
      return response.data.data; 
    } catch (error) {
        console.error("Error posting data", error);
    }
    
};

export default create;