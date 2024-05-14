import React from 'react'
import { FaLocationDot, FaPen, FaTrash } from "react-icons/fa6";
import PrimaryButton from '../../buttons/primaryButton';

function VenueManagerLi({venue, onClick}) {
  return (
    <article onClick={onClick} className=' cursor-pointer my-2 flex justify-between bg-skin-createBg p-5 rounded-md'>
        <section className=' flex items-center gap-5'>
        <div className='flex gap-2 items-center'>
            <FaLocationDot className=' text-skin-tagTextColor' size={30} />
            <div>
              <h4 className='font-semibold text-skin-mutedText'>Location</h4>
              <p className='text-skin-primary text-xl'>{venue.location.country}</p>
            </div>
        </div>
            
        <div>
            <h4 className='font-semibold text-skin-mutedText'>Address</h4>
            <p className='text-skin-primary text-xl'><span>{venue.location.city}</span>, <span>{venue.location.address}</span></p>
        </div>
           
        </section>
        <section className='flex gap-7'>
            <PrimaryButton className='trashIcon bg-skin-editBg hover:bg-skin-primary p-4 text-white' disabled={false}>
             <FaPen size={20} />
            </PrimaryButton>
            <PrimaryButton className='trashIcon bg-red-400 p-4 text-white hover:bg-red-500 ' disabled={false}>
             <FaTrash size={20} />
            </PrimaryButton>
        </section>
      
    </article>
  )
}

export default VenueManagerLi;