import React, { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import ProfileBadge from './profileBadge';
import PrimaryButton from '../../buttons/primaryButton'; 
import Modal from "../../modal";
import { FaCamera, FaCircleCheck } from "react-icons/fa6";
import { profileAPI } from '../../../api/profiles';
import { useEffect } from 'react';


function ProfileHeader() {
  const { user, loading, error, setUser, saveUserToLocalStorage } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [banner, setBanner] = useState('');

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar.url);
      setBanner(user.banner.url);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user || !user.banner) {
    return <div>No user data available</div>;
  }

  const handleButtonClick = () => {
    setModalOpen(!isModalOpen);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleBannerChange = (e) => {
    setBanner(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedProfile = await profileAPI.updateProfile(user.name, { 
        avatar: { url: avatar }, 
        banner: { url: banner } });
      const updatedUser = { ...user, avatar: updatedProfile.avatar, banner: updatedProfile.banner };
      setUser(updatedUser)
      setModalOpen(false);
      saveUserToLocalStorage(updatedUser)
    } catch (error) {
      console.error("Failed to update profile:", error);
     
    }
  };

  return (
    <div className='container mx-auto my-7 px-7'> 
      <article className="profile-header relative">
        <img className='w-full h-60 object-cover rounded-md' src={user.banner.url} alt={user.banner.alt} />
        <div className='absolute avatarSection flex flex-wrap items-center top-6 left-6'>
          <ProfileBadge name={user.name} email={user.email} avatarUrl={user.avatar.url}/>
        </div>
        
        <PrimaryButton onClick={handleButtonClick} className=" px-2.5 py-2.5 bg-skin-editBg absolute top-4 left-4" disabled={false}>
          <FaCamera className='text-white' size={20} />
        </PrimaryButton>
        <Modal isOpen={isModalOpen} onClose={handleButtonClick}>
          <article className="flex flex-col">
            <h4 className="text-lg font-bold text-skin-primary">Edit avatar/banner</h4>
            <div className="my-7">
              <label htmlFor="avatar">Edit avatar</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
                type="text"
                name="avatar"
                id="avatar"
                value={avatar}
                onChange={handleAvatarChange}
              />
            </div>
            <div className="mb-7">
              <label htmlFor="banner">Edit banner</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
                type="text"
                name="banner"
                id="banner"
                value={banner}
                onChange={handleBannerChange}
              />
            </div>
            <PrimaryButton onClick={handleUpdate} className="pl-5 flex flex-row-reverse items-center justify-between px-2.5 py-2.5 top-4 left-4 bg-skin-editBg text-white" disabled={false} text="Update">
              <FaCircleCheck size={24} />
            </PrimaryButton>
          </article>
        </Modal>
      </article>
    </div>
  );
}

export default ProfileHeader;


