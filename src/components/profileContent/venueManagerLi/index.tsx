import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import PrimaryButton from "../../buttons/primaryButton";
import FeedbackMessage from "../../messages/feedbackMessage";

interface VenueManagerLiProps {
  venue: any;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  feedbackMessage: string;
  showFeedbackMessage: boolean;
  isSuccessMessage: boolean;
}

const VenueManagerLi: React.FC<VenueManagerLiProps> = ({
  venue,
  onClick,
  onEdit,
  onDelete,
  feedbackMessage,
  showFeedbackMessage,
  isSuccessMessage,
}) => {
  const messageClassName = isSuccessMessage
    ? "bg-green-200 text-green-600"
    : "bg-blue-200 text-blue-600";

  return (
    <article
      onClick={onClick}
      className="h-full cursor-pointer flex flex-col sm:flex-row border-b-2 p-5 hover:bg-skin-createBg"
    >
      <section className="flex flex-col sm:flex-row items-start gap-5 w-full">
        <article className="relative h-full">
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            className=" w-full object-cover max-h-60 sm:min-h-32 sm:max-h-32 sm:min-w-44 sm:max-w-44 rounded-lg shadow-md"
          />
          <PrimaryButton
            className="absolute top-1 left-1 bg-skin-infoBg p-2 hover:bg-skin-primary hover:text-white text-skin-primary"
            disabled={false}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <FaPen size={26} />
          </PrimaryButton>
        </article>
        <article className="flex flex-col gap-2">
          <section>
            <h4 className="font-semibold text-skin-mutedText">Location</h4>
            <p className="text-skin-primary text-xl">
              {venue.location.country}
            </p>
          </section>
          <section>
            <h4 className="font-semibold text-skin-mutedText">Address</h4>
            <p className="text-skin-primary text-xl">
              <span>{venue.location.city}</span>,{" "}
              <span>{venue.location.address}</span>
            </p>
          </section>
          <div className="self-start">
            <p className="text-skin-tagTextColor text-xl">
              Bookings:{" "}
              <span className="font-medium">{venue._count.bookings}</span>
            </p>
          </div>
        </article>
      </section>
      {showFeedbackMessage && (
        <FeedbackMessage
          feedbackMessage={feedbackMessage}
          className={messageClassName}
        />
      )}
      <div className="flex justify-start sm:justify-center sm:flex-col gap-2 mt-4 sm:mt-0 sm:ml-auto">
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
};

export default VenueManagerLi;
