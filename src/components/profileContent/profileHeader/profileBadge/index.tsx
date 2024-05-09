import React from "react"
import { useAuth } from "../../../../context/authContext"


function ProfileBadge() {

    const {user} = useAuth();

    if( !user ) {
        return <div>Loading...</div>
      }

    return (
        <section className=' avatarSection flex flex-wrap items-center absolute top-6 left-6'>
            {user.avatar && (
            <img className='rounded-full max-w-28 min-w-20' src={user.avatar.url} alt={user.avatar.alt || "User Avatar"} />
            )}
            <section className='nameAndContactInfo p-2'>
                <h1 className='text-2xl font-semibold'>{user.name}</h1>
                <p>{user.email}</p>
            </section>
        </section>
          
        )
}

export default ProfileBadge
