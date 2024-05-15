import React from 'react';
import PrimaryButton from '../../buttons/primaryButton';
import { TextArea, TextInput, Checkbox } from '../formContent';

interface VenueFormProps {
    handleSubmit: (event: React.FormEvent) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
            <TextInput name="maxGuests" value={formData.maxGuests} onChange={handleChange} placeholder="Max Guests" type="number" required />
            <fieldset>
                <legend>Meta Options</legend>
                <Checkbox name="wifi" checked={formData.meta.wifi} onChange={handleChange} label="Wifi" />
                <Checkbox name="parking" checked={formData.meta.parking} onChange={handleChange} label="Parking" />
                <Checkbox name="breakfast" checked={formData.meta.breakfast} onChange={handleChange} label="Breakfast" />
                <Checkbox name="pets" checked={formData.meta.pets} onChange={handleChange} label="Pets Allowed" />
            </fieldset>
            <TextArea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <TextInput name="location.address" value={formData.location.address} onChange={handleChange} placeholder="Address" />
            <TextInput name="location.city" value={formData.location.city} onChange={handleChange} placeholder="City" />
            <TextInput name="location.country" value={formData.location.country} onChange={handleChange} placeholder="Country" />
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





