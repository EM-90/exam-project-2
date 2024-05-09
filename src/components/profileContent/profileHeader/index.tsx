import { FaCamera } from "react-icons/fa6";
import React from 'react'
import { useAuth } from '../../../context/authContext'
import ProfileBadge from './profileBadge';
import EditButton from "../../buttons/editButton";


function ProfileHeader() {

  const { user, loading, error } = useAuth();

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
    console.log("Button was clicked!");
  }

 
    return (
      <div className='container mx-auto my-7 px-7'> 
        <article className="profile-header relative">
          <img className='w-full h-60 object-cover rounded-md absolute' src={user.banner.url} alt={user.banner.alt} />
          <ProfileBadge/>
          <EditButton onClick={handleButtonClick} className="relative top-4 left-4" disabled={false}>
          <FaCamera size={20} />
          </EditButton>
        </article>
      </div>
    )
    


}
export default ProfileHeader

