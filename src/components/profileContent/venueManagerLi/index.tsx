import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import PrimaryButton from '../../buttons/primaryButton';

function VenueManagerLi({ venue, onClick, onEdit, onDelete }) {
  return (
    <article
      onClick={onClick}
      className="cursor-pointer flex flex-col sm:flex-row border-b-2 p-5 hover:bg-skin-createBg">
      <section className="flex flex-col sm:flex-row items-start gap-5 w-full">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <div className="relative w-full sm:w-auto">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt}
              className="object-cover w-full sm:w-44 h-32 rounded-lg shadow-md"
            />
            <PrimaryButton
              className="absolute top-1 left-1 bg-skin-infoBg p-2 hover:bg-skin-primary hover:text-white text-skin-primary"
              disabled={false}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <FaPen size={20} />
            </PrimaryButton>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="font-semibold text-skin-mutedText">Location</h4>
              <p className="text-skin-primary text-xl">{venue.location.country}</p>
            </div>
            <div>
              <h4 className="font-semibold text-skin-mutedText">Address</h4>
              <p className="text-skin-primary text-xl">
                <span>{venue.location.city}</span>, <span>{venue.location.address}</span>
              </p>
            </div>
            <div className="self-start">
              <p className="text-skin-tagTextColor text-xl">
                Bookings: <span className="font-medium">{venue._count.bookings}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center sm:flex-col gap-2 mt-4 sm:mt-0 sm:ml-auto">
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
    </article>
  );
}

export default VenueManagerLi;


