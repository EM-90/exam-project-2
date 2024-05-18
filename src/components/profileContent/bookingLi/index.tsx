import React from 'react';
import PrimaryButton from '../../buttons/primaryButton';
import { FaPen } from 'react-icons/fa';

function BookingLi({ booking }) {
  const { venue, dateFrom, dateTo } = booking;
  const { location } = venue || {};

  return (
    <article className="w-full p border-t-2 hover:bg-skin-createBg hover:rounded-bottom py-5 px-4 hover:shadow-md last:border-b-2 ">
      <div className='flex justify-between flex-wrap ' >
      <div className='flex  gap-7 flex-wrap'>
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
        <div className='userBookings flex gap-4'>
          <div className=' text-right'>
            <p className='font-semibold text-skin-mutedText text-lg'>From - <span className='text-skin-primary text-lg'>{new Date(dateFrom).toLocaleDateString()}</span> </p>
            <p className='font-semibold text-skin-mutedText text-lg'>To - <span className='text-skin-primary text-lg'>{new Date(dateTo).toLocaleDateString()}</span></p>
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

