interface ProfileBadgeProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  owner?: {
    avatar?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
    bio?: string;
    name: string;
  };
}

function ProfileBadge({
  name,
  email,
  avatarUrl,
  avatarAlt,
  owner,
}: ProfileBadgeProps) {
  if (!name && !email && !avatarUrl) {
    return <div>Loading...</div>;
  }

  return (
    <article className="avatarSection flex flex-wrap items-center ">
      {avatarUrl && (
        <img
          className="rounded-full object-cover w-28 h-28"
          src={avatarUrl}
          alt={avatarAlt || "User Avatar"}
        />
      )}
      <section className="nameAndContactInfo px-2 py-1 sm:ml-2 rounded-md h-20 bg-white">
        {name && <h1 className="text-2xl font-semibold">{name}</h1>}
        {email && <p className="text-wrap">{email}</p>}
        {owner?.bio && (
          <section className="mt-5">
            <h4 className="font-bold">About</h4>
            <p>{owner.bio}</p>
          </section>
        )}
      </section>
    </article>
  );
}

export default ProfileBadge;
