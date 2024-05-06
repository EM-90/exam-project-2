import React, { useEffect } from 'react';
import { useAuth } from '../../../context/authContext';


const UserInfo = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("User data in Avatar component:", user);
  }, [user]);

  if (!user) {
    return <div>problem with user</div>;
  }

  return (
    <div className='container mx-auto my-7 px-7'>
      <div className=' relative max-h-60'>
        <img className='w-full h-48 object-cover' src={user.banner.url} alt={user.banner.alt} />
        <div className='avatar-info absolute top-0 m-4 z-100'>
          <img className='rounded-full' src={user.avatar.url } alt={user.avatar.alt} style={{ width: '100px', height: '100px' }} />
            <div className='text-xl font-semibold '>{user.name}</div>
            <div>{user.email}</div>
        </div>
      </div>
    </div>
  
    
  );
};

export default UserInfo;
