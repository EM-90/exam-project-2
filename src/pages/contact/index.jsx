import { useEffect } from "react";
import { createApiKey } from "../../api/apiKey";

function Contact() {
  useEffect(() => {
    const initializeApiKey = async () => {
      try {
        const apiKey = await createApiKey(); 
        console.log('API Key:', apiKey); 
        
      } catch (error) {
        console.error('Failed to initialize API key:', error);
      }
    };

    initializeApiKey(); 
  }, []); 


  return (
    <div>
      <h1>Contact</h1>
    </div>
  )
}

export default Contact
