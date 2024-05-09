
import React from 'react'
import { useAuth } from '../../../context/authContext'

function ProfileHeader() {

  const {user} = useAuth();

  console.log("User Data:", user);

  if( !user || !user.data) {
    return <div>Loading...</div>
  }
 

  return (
    <div className='container mx-auto my-7 px-7'> 
      <article className="profile-header relative overflow-hidden">
        <img className='w-full h-60 object-cover rounded-md' src={user.data.banner.url} alt={user.data.banner.alt} />
        <section className='flex flex-wrap items-center absolute top-6 left-6'>
          {user.data.avatar && (
            <img className='rounded-full max-w-28 min-w-20' src={user.data.avatar.url} alt={user.data.avatar.alt || "User Avatar"} />
          )}
          <section className='nameAndContactInfo p-2'>
            <h1 className='text-2xl font-semibold'>{user.data.name}</h1>
            <p>{user.data.email}</p>
          </section>
        </section>
      </article>
    </div>
  )
  
}

export default ProfileHeader

//Outer div can be removed and placed in layout, since every page uses this
