

 export const createApiKey = async () => {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
      method: 'POST',
      headers: {
        "X-Noroff-API-Key": apiKey,
       
      },
      body: JSON.stringify({
        name: "API key noroff" 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create API key');
    }

    const responseData = await response.json();
    const apiKey = responseData.data.key; 
    return apiKey;
  } catch (error) {
    console.error('Failed to create API key:', error);
    throw error;
  }
};




