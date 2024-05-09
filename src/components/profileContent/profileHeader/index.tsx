import { FaCamera, FaCircleCheck } from "react-icons/fa6";
import React from 'react'
import { useAuth } from '../../../context/authContext'
import ProfileBadge from './profileBadge';
import EditButton from "../../buttons/editButton";
import { useState } from "react";
import Modal from "../../modal";


function ProfileHeader() {

  const { user, loading, error } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }

  if (!user  || !user.banner ) {
      return <div>No user data available</div>;
  }

  const handleButtonClick = () => {
   setModalOpen(!isModalOpen);
   console.log(isModalOpen);
  }

 
    return (
      <div className='container mx-auto my-7 px-7'> 
        <article className="profile-header relative">
          <img className='w-full h-60 object-cover rounded-md absolute' src={user.banner.url} alt={user.banner.alt} />
          <ProfileBadge/>
          <EditButton onClick={handleButtonClick} className="relative top-4 left-4" disabled={false}>
          <FaCamera size={20} />
          </EditButton>
          <Modal isOpen={isModalOpen} onClose={handleButtonClick}>
            <article className="flex flex-col">
              <h4 className="text-lg font-bold text-skin-primary">Edit avatar/banner</h4>
              <div className="my-7">
                <label htmlFor="avatar">Edit avatar</label>
                <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="text" name="avatar" id="avatar"/>
              </div>
              <div className=" mb-7">
                <label htmlFor="banner">Edit banner</label>
                <input className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder" type="text" name="banner" id="banner"/>
              </div>
              <EditButton onClick={handleButtonClick} className=" pl-5 flex flex-row-reverse items-center justify-between top-4 left-4" disabled={false} text="Uppdate">
              <FaCircleCheck size={24} />
              </EditButton>
            </article>
          </Modal>
        </article>
      </div>
    )
    


}
export default ProfileHeader

