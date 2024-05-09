
import React from 'react'
import { useAuth } from '../../../context/authContext'
import ProfileBadge from './profileBadge';


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

 
  return (
    <div className='container mx-auto my-7 px-7'> 
      <article className="profile-header relative overflow-hidden">
        <img className='w-full h-60 object-cover rounded-md' src={user.banner.url} alt={user.banner.alt} />
        <ProfileBadge/>
      </article>
    </div>
  )
  
}

export default ProfileHeader

//Outer div can be removed and placed in layout, since every page uses this
