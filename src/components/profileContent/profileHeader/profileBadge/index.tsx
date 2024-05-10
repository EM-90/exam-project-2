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
            <img className='rounded-full object-cover w-28 h-28 ' src={user.avatar.url} alt={user.avatar.alt || "User Avatar"} />
            )}
            <section className='nameAndContactInfo px-4 py-2 ml-2 rounded-md bg-white'>
                <h1 className='text-2xl font-semibold '>{user.name}</h1>
                <p>{user.email}</p>
            </section>
        </section>
          
        )
}

export default ProfileBadge
