import React from "react";
import PrimaryButton from "../../buttons/primaryButton";
import { FaTrash } from "react-icons/fa";

interface BookingLiProps {
  booking: any;
  onClick: () => void;
  onDelete: () => void;
}

const BookingLi: React.FC<BookingLiProps> = ({
  booking,
  onClick,
  onDelete,
}) => {
  const { venue, dateFrom, dateTo } = booking;
  const { location } = venue || {};

  return (
    <article
      onClick={onClick}
      className="w-full p border-b-2 last:border-b-0 hover:bg-skin-createBg hover:rounded-bottom py-5 px-4"
    >
      <header className="flex flex-col sm:flex-row justify-between flex-wrap">
        <div className="flex flex-col md:flex-row gap-4">
          {venue.media && venue.media.length > 0 && (
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || "Venue image"}
              className="w-full object-cover max-h-60 sm:min-h-32 sm:max-h-32 sm:min-w-44 sm:max-w-44 rounded-lg shadow-md"
            />
          )}
          <section className="flex flex-col md:ml-4">
            <div className="max-w-50 truncate text-ellipsis">
              <h4 className="font-semibold text-skin-mutedText">Location</h4>
              <p className="text-skin-primary text-xl">{location?.country}</p>
            </div>
            <div className="text-wrap max-w-50 pt-3">
              <h4 className="font-semibold text-skin-mutedText">Address</h4>
              <p className="text-wrap text-skin-primary text-xl">
                <span>{location?.city}</span>, <span>{location?.address}</span>
              </p>
            </div>
          </section>
        </div>
        <div className="userBookings flex flex-col sm:flex-row gap-4 sm:ml-auto mt-4 sm:mt-0">
          <div className="sm:text-right">
            <p className="font-semibold text-skin-mutedText text-lg">
              From -{" "}
              <span className="text-skin-primary text-lg">
                {new Date(dateFrom).toLocaleDateString()}
              </span>
            </p>
            <p className="font-semibold text-skin-mutedText text-lg">
              To -{" "}
              <span className="text-skin-primary text-lg">
                {new Date(dateTo).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div>
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
        </div>
      </header>
    </article>
  );
};

export default BookingLi;
