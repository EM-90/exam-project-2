import { useState, useEffect } from "react";
import { venueAPI } from "../../api/venue";
import { Venue } from "../../types";

const initialFormData: Venue = {
  name: "",
  description: "",
  price: 0,
  maxGuests: 0,
  media: [{ url: "", alt: "" }],
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  location: {
    address: "",
    city: "",
    country: "",
  },
  bookings: [],
};

const useVenueForm = (
  venueId: string | null
): [
  Venue,
  (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void,
  () => void
] => {
  const [formData, setFormData] = useState<Venue>(initialFormData);

  useEffect(() => {
    if (venueId) {
      const fetchVenue = async () => {
        try {
          const response = await venueAPI.fetchVenueById(venueId);
          const venueData: Venue = response.data.data;
          venueData.media =
            venueData.media && venueData.media.length > 0
              ? venueData.media
              : [{ url: "", alt: "" }];
          setFormData(venueData);
        } catch (error) {
          console.error("Failed to fetch venue:", error);
        }
      };
      fetchVenue();
    } else {
      setFormData(initialFormData);
    }
  }, [venueId]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;

    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      if (name.startsWith("media.")) {
        const [_, index, field] = name.split(".");
        if (!newFormData.media) newFormData.media = [];
        if (!newFormData.media[+index])
          newFormData.media[+index] = { url: "", alt: "" };
        newFormData.media[+index] = {
          ...newFormData.media[+index],
          [field]: value,
        };
      } else if (name.startsWith("location.")) {
        const field = name.split(".")[1];
        if (["address", "city", "country"].includes(field)) {
          newFormData.location = { ...newFormData.location, [field]: value };
        }
      } else if (
        name in newFormData.meta &&
        event.target instanceof HTMLInputElement &&
        type === "checkbox"
      ) {
        newFormData.meta[name as keyof Venue["meta"]] = event.target.checked;
      } else if (name === "maxGuests") {
        newFormData.maxGuests = parseInt(value, 10);
      } else {
        (newFormData as any)[name] =
          type === "number" ? parseInt(value, 10) : value;
      }

      return newFormData;
    });
  };

  const resetFormData = () => setFormData(initialFormData);

  return [formData, handleChange, resetFormData];
};

export default useVenueForm;
