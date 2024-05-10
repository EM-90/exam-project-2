import React from "react";
import { User } from "../../../../types";

interface ProfileBadgeProps {
    name?: string;
    email?: string;
    avatarUrl?: string;
    avatarAlt?: string;
}

function ProfileBadge({ name, email, avatarUrl, avatarAlt }: ProfileBadgeProps) {
    if (!name && !email && !avatarUrl) {
        return <div>Loading...</div>; 
    }

    return (
        <section className='avatarSection flex flex-wrap items-center absolute top-6 left-6'>
            {avatarUrl && (
                <img className='rounded-full object-cover w-28 h-28' src={avatarUrl} alt={avatarAlt || "User Avatar"} />
            )}
            <section className='nameAndContactInfo px-4 py-2 ml-2 rounded-md bg-white'>
                {name && <h1 className='text-2xl font-semibold'>{name}</h1>}
                {email && <p>{email}</p>}
            </section>
        </section>
    );
}

export default ProfileBadge;

