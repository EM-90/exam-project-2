import React from 'react';
import PrimaryButton from '../../buttons/primaryButton';
import { TextArea, TextInput, Checkbox } from '../formContent';

interface VenueFormProps {
    handleSubmit: (event: React.FormEvent) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    formData: any;
    venueId?: string;
}

const VenueForm: React.FC<VenueFormProps> = ({ handleSubmit, handleChange, formData, venueId }) => {
    return (
        <form onSubmit={handleSubmit}>
            <h4 className="text-lg font-bold text-skin-primary mb-7">
                {venueId ? 'Update Venue' : 'Add New Venue'}
            </h4>
            <TextInput name="name" value={formData.name} onChange={handleChange} placeholder="Venue Name" required />
            <TextInput name="media.0.url" value={formData.media?.[0]?.url ?? ''} onChange={handleChange} placeholder="Place the image url here" />
            <TextInput name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" required />
            <fieldset className='flex gap-5 my-5'>
                <legend className='mb-3 font-medium'>This venue includes</legend>
                <Checkbox name="wifi" checked={formData.meta.wifi} onChange={handleChange} label="Wifi" />
                <Checkbox name="parking" checked={formData.meta.parking} onChange={handleChange} label="Parking" />
                <Checkbox name="breakfast" checked={formData.meta.breakfast} onChange={handleChange} label="Breakfast" />
                <Checkbox name="pets" checked={formData.meta.pets} onChange={handleChange} label="Pets" />
            </fieldset>
            <div className='flex flex-col w-24'>
                <label className='font-medium' htmlFor="maxGuests">Max Guests</label>
                <select className='border rounded-md p-1' name="maxGuests" value={formData.maxGuests} onChange={handleChange} required>
                    <option value="1">Select</option>
                    <option value="2">1</option>
                    <option value="3">2</option>
                    <option value="4">3</option>
                    <option value="5">4</option>
                </select>
            </div>
            <TextArea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <TextInput name="location.address" value={formData.location.address} onChange={handleChange} placeholder="Address" required />
            <TextInput name="location.city" value={formData.location.city} onChange={handleChange} placeholder="City" required />
            <TextInput name="location.country" value={formData.location.country} onChange={handleChange} placeholder="Country" required />
            <PrimaryButton
                className="w-full py-3 bg-skin-createBg hover:text-white text-skin-primary"
                text="Submit"
                disabled={false}
                type="submit"
            />
        </form>
    );
};

export default VenueForm;






