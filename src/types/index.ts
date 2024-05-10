export interface Venue {
    id: string;
    name: string;
    description: string;
    media: {
        url: string,
        alt: string,
    }[];      
    price: number;          
    maxGuests: number;      
    rating: number;         
    location:{
        address: string;
        city: string;
        zip: string;
        country: string;
        continent: string;
        lat: number;
        lng: number;
    };
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
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

  
  export type Avatar = {
    url: string;
    alt?: string;
  };
  
  export type Banner = {
    url: string;
    alt?: string;
  };
  
  export type User = {
    id: string;
    accessToken: string;
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
  
    
};

  
 
  
  