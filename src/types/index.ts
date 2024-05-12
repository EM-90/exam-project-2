export interface Venue {
    
    id?: string;
    name: string;
    description: string;
    media?: {
        url: string,
        alt: string,
    }[];      
    price: number;          
    maxGuests: number;      
    rating?: number;         
    location:{
        address: string;
        city: string;
        zip?: string;
        country: string;
        continent?: string;
    };
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    }

    owner?: {
      avatar?: {
        url: string;
        alt:string;
      }
      banner?: {
        url: string;
        alt:string;
      }
      bio?: string;
      name:string;
      email:string;
    }
   
  }

  export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
  }
  
 
  export interface Profile {
    id: string;
    name: string;
    email: string;
    bio?: string;
    avatar: {
      url: string;
      alt?: string;
  };
  banner: {
    url: string;
    alt?: string;
}; 
    venueManager: boolean;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
  }

  
  export type User = {
    id?: string;
    accessToken?: string;
    name: string;
    email?: string;
    bio?: string;  
    avatar: {
        url: string;
        alt?: string;
    };
    banner: {
        url: string;
        alt?: string;
    };
    venueManager?: boolean;
    
  
    
};

  
 
  
  