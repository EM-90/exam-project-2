
import { FormEvent } from 'react';
import { venueAPI } from '../../api/venue';

export const handleUpdate = async (event: FormEvent, venueId: string, formData: any) => {
    event.preventDefault();
    try {
        const response = await venueAPI.updateVenue(venueId, formData);
        alert('Venue updated successfully!');
        console.log(response);
    } catch (error) {
        console.error('Failed to update venue:', error);
        alert('Failed to update venue.');
    }
};


export const handleCreate = async (event: FormEvent, formData: any) => {
    event.preventDefault();
    try {
        const response = await venueAPI.createVenue(formData);
        alert('Venue created successfully!');
        console.log(response);
    } catch (error) {
        console.error('Failed to create venue:', error);
        alert('Failed to create venue.');
    }
};

export const handleDelete = async (id: string, setVenues: React.Dispatch<React.SetStateAction<any[]>>, venues: any[]) => {
    try {
        await venueAPI.deleteVenue(id);
        setVenues(venues.filter(venue => venue.id !== id));
    } catch (error) {
        console.error('Failed to delete venue:', error);
    }
};


