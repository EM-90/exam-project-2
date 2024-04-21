import { baseLink } from "../linkConst/Index";

const registerUser = async (userData: any) => {
    const response = await fetch(`${baseLink}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    
    return responseData;
    
}

export default registerUser;