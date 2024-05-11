import React, { useState } from 'react';
import { venueAPI } from '../../../api/venue';
import PrimaryButton from '../../buttons/primaryButton';

const VenueForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        media: [{url:'', alt:''}],
        price: 0,
        maxGuests: 0,
        rating: 0,
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

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    [name]: checked
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await venueAPI.createVenue(formData);
            console.log(response);
            alert('Venue created successfully!');
        } catch (error) {
            console.error('Failed to create venue:', error);
            alert('Failed to create venue.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="text-lg font-bold text-skin-primary mb-7">Add new venue</h4>
            <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Venue Name" required />
            
            <input className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <input className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} placeholder="Max Guests" required />

            <fieldset>
                <legend>Meta Options</legend>
                <label>
                    <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="checkbox" name="wifi" checked={formData.meta.wifi} onChange={handleChange} /> Wifi
                </label>
                <label>
                    <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="checkbox" name="parking" checked={formData.meta.parking} onChange={handleChange} /> Parking
                </label>
                <label>
                    <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="checkbox" name="breakfast" checked={formData.meta.breakfast} onChange={handleChange} /> Breakfast
                </label>
                <label>
                    <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="checkbox" name="pets" checked={formData.meta.pets} onChange={handleChange} /> Pets Allowed
                </label>
            </fieldset>

            <textarea className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            
            <input className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="text" name="address" value={formData.location.address} onChange={handleChange} placeholder="Address" />
            <input className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="text" name="city" value={formData.location.city} onChange={handleChange} placeholder="City" />
            <input className="w-full px-3 py-2 my-5 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="text" name="country" value={formData.location.country} onChange={handleChange} placeholder="Country" />
            <PrimaryButton className='w-full py-3 bg-skin-createBg  hover:text-white text-skin-primary' text="Submit" disabled={false} type='submit'/>
        </form>
    );
};

export default VenueForm; 

