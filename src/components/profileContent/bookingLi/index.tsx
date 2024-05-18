import React from 'react';
import PrimaryButton from '../../buttons/primaryButton';
import { FaPen } from 'react-icons/fa';

function BookingLi({ booking }) {
  const { venue, dateFrom, dateTo } = booking;
  const { location } = venue || {};

  return (
    <article className=" border-t-2 hover:bg-skin-createBg hover:rounded-bottom py-5 px-4 hover:shadow-md ">
      <div className='flex justify-between' >
      <div className='flex  gap-7'>
        <div>
          {venue.media && venue.media.length > 0 && (
            <img src={venue.media[0].url} alt={venue.media[0].alt || 'Venue image'} className="object-cover min-h-32 max-h-32 min-w-44 max-w-44 rounded-lg shadow-md" />
          )}
        </div>
        <div>
          <div className=' max-w-50 truncate text-ellipsis'>
            <h4 className='font-semibold text-skin-mutedText'>Location</h4>
            <p className='text-skin-primary text-xl'>{location?.country}</p>
          </div>
          <div className=' max-w-50 truncate text-ellipsis pt-3'>
            <h4 className='font-semibold text-skin-mutedText'>Address</h4>
            <p className='text-skin-primary text-xl'><span>{location?.city}</span>, <span>{location?.address}</span></p>
          </div>
        </div>
        </div>
        <div className='userBookings flex flex-col gap-4 items-end'>
          <div>
            <p>From: {new Date(dateFrom).toLocaleDateString()}</p>
            <p className=''>To: {new Date(dateTo).toLocaleDateString()}</p>
          </div>
          <div>
             <PrimaryButton className='penIcon bg-skin-editBg hover:bg-skin-primary p-4 text-white' disabled={false} >
               <FaPen size={20} />
             </PrimaryButton>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BookingLi;

