import { useState, useEffect } from 'react';
import { venueAPI } from '../../api/venue';
import { Venue } from '../../types';

const useVenueForm = (venueId: string | null): [Venue, (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] => {
    const [formData, setFormData] = useState<Venue>({
        name: '',
        description: '',
        price: 0,
        maxGuests: 0,
        media: [{ url: '', alt: '' }],
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false
        },
        location: {
            address: '',
            city: '',
            country: ''
        }
    });

    useEffect(() => {
        if (venueId) {
            const fetchVenue = async () => {
                try {
                    const response = await venueAPI.fetchVenueById(venueId);
                    const venueData: Venue = response.data.data;
                    venueData.media = venueData.media ?? [{ url: '', alt: '' }];
                    setFormData(venueData);
                } catch (error) {
                    console.error('Failed to fetch venue:', error);
                }
            };
            fetchVenue();
        }
    }, [venueId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;

        if (type === 'checkbox' && event.target instanceof HTMLInputElement) {
            const { checked } = event.target;
            setFormData(prev => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    [name]: checked
                }
            }));
        } else if (name.includes('media')) {
            const [ index, key] = name.split('.');
            const updatedMedia = [...(formData.media || [])];
            updatedMedia[parseInt(index)][key] = value;

            setFormData(prev => ({
                ...prev,
                media: updatedMedia
            }));
        } else if (name.includes('location')) {
            const [key, subkey] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    [subkey]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? parseInt(value, 10) : value
            }));
        }
    };

    return [formData, handleChange];
};

export default useVenueForm;

