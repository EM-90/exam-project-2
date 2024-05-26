import React from "react";
import PrimaryButton from "../../buttons/primaryButton";
import { TextArea, TextInput, Checkbox } from "../formContent";

interface VenueFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  formData: any;
  venueId?: string;
}

const VenueForm: React.FC<VenueFormProps> = ({
  handleSubmit,
  handleChange,
  formData,
  venueId,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
      <h4 className="text-lg font-bold text-skin-primary mb-7">
        {venueId ? "Update Venue" : "Add New Venue"}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Venue name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Venue Name"
          required
        />
        <TextInput
          label="Image url"
          name="media.0.url"
          value={formData.media?.[0]?.url ?? ""}
          onChange={handleChange}
          placeholder="Place the image url here"
        />
        <TextInput
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
        />
        <div className="col-span-1 md:col-span-2">
          <fieldset className="flex gap-5 my-5 flex-col sm:flex-row">
            <legend className="mb-3 font-medium text-wrap">
              This venue includes
            </legend>
            <Checkbox
              name="wifi"
              checked={formData.meta.wifi}
              onChange={handleChange}
              label="Wifi"
            />
            <Checkbox
              name="parking"
              checked={formData.meta.parking}
              onChange={handleChange}
              label="Parking"
            />
            <Checkbox
              name="breakfast"
              checked={formData.meta.breakfast}
              onChange={handleChange}
              label="Breakfast"
            />
            <Checkbox
              name="pets"
              checked={formData.meta.pets}
              onChange={handleChange}
              label="Pets"
            />
          </fieldset>
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="font-medium" htmlFor="maxGuests">
            Max Guests
          </label>
          <select
            className="border rounded-md p-1 w-full"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <TextInput
          label="Address"
          name="location.address"
          value={formData.location.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <TextInput
          label="City"
          name="location.city"
          value={formData.location.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <TextInput
          label="Country"
          name="location.country"
          value={formData.location.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
      </div>
      <PrimaryButton
        className="w-full py-3 bg-skin-createBg hover:text-white text-skin-primary mt-4"
        text="Submit"
        disabled={false}
        type="submit"
      />
    </form>
  );
};

export default VenueForm;
