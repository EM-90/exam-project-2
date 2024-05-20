import React from 'react'
import { FaLocationDot, FaPen, FaTrash } from "react-icons/fa6";
import PrimaryButton from '../../buttons/primaryButton';

interface VenueManagerLiProps {
  venue: any; 
  onClick: () => void;
  onEdit: () => void;
}


function VenueManagerLi({ venue, onClick, onEdit, onDelete }) {
  return (
    <article onClick={onClick} className="cursor-pointer flex justify-between border-b-2 p-5 hover:bg-skin-createBg">
      <section className="flex flex-col sm:flex-row items-start gap-5 w-full">
        <div className="flex-shrink-0">
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            className="object-cover h-32 w-32 rounded-lg shadow-md"
          />
        </div>
        <div className="flex-col gap-5">
          <div className="flex gap-2">
            <div>
              <h4 className="font-semibold text-skin-mutedText">Location</h4>
              <p className="text-skin-primary text-xl">{venue.location.country}</p>
            </div>
          </div>
          <div className=''>
            <h4 className="font-semibold text-skin-mutedText">Address</h4>
            <p className="text-skin-primary text-xl">
              <span>{venue.location.city}</span>, <span>{venue.location.address}</span>
            </p>
          </div>
          <div className="self-start lg:self-end ">
            <p className="text-skin-tagTextColor text-xl">
              Bookings: <span className="font-medium">{venue._count.bookings}</span>
            </p>
          </div>
        </div>
      </section>
      <section className="flex xlg:flex-wrap gap-3 mt-5 lg:mt-0">
        <div className='buttonContainer'>
          <PrimaryButton
            className="penIcon bg-skin-editBg hover:bg-skin-infoBg p-4 text-skin-primary"
            disabled={false}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <FaPen size={20} />
          </PrimaryButton>
        </div>
        <div className='buttonContainer'>
          <PrimaryButton
            className="trashIcon p-4 text-gray-500 hover:bg-gray-200"
            disabled={false}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <FaTrash size={20} />
          </PrimaryButton>
        </div>
      </section>
    </article>
  );
}

export default VenueManagerLi;
