import React, { useState } from "react";
import { useAuth } from "../../../context/authContext";
import ProfileBadge from "./profileBadge";
import PrimaryButton from "../../buttons/primaryButton";
import Modal from "../../modal";
import { FaCamera, FaCircleCheck } from "react-icons/fa6";
import { profileAPI } from "../../../api/profiles";
import { useEffect } from "react";

function ProfileHeader() {
  const { user, loading, error, setUser, saveUserToLocalStorage } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBanner(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedProfile = await profileAPI.updateProfile(user.name, {
        avatar: { url: avatar },
        banner: { url: banner },
      });
      const updatedUser = {
        ...user,
        avatar: updatedProfile.avatar,
        banner: updatedProfile.banner,
      };
      setUser(updatedUser);
      setModalOpen(false);
      saveUserToLocalStorage(updatedUser);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <header className="profile-header relative">
      <figure>
        <img
          className="w-full h-60 object-cover sm:rounded-md"
          src={user.banner.url}
          alt={user.banner.alt}
        />
        <figcaption className="absolute avatarSection flex flex-wrap items-center top-4 left-3">
          <ProfileBadge
            name={user.name}
            email={user.email}
            avatarUrl={user.avatar.url}
          />
        </figcaption>
      </figure>

      <PrimaryButton
        onClick={handleButtonClick}
        className="px-2.5 py-2.5 bg-skin-createBg absolute top-4 left-4 border-transparent hover:border-2"
        disabled={false}
      >
        <FaCamera className="text-skin-primary" size={20} />
      </PrimaryButton>
      <Modal isOpen={isModalOpen} onClose={handleButtonClick}>
        <article className="p-5 flex flex-col">
          <h4 className="text-lg font-bold text-skin-primary">
            Edit avatar/banner
          </h4>
          <form>
            <div className="my-7">
              <label htmlFor="avatar" className="block mb-2">
                Edit avatar
              </label>
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
              <label htmlFor="banner" className="block mb-2">
                Edit banner
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-skin-InputBorder"
                type="text"
                name="banner"
                id="banner"
                value={banner}
                onChange={handleBannerChange}
              />
            </div>
            <PrimaryButton
              onClick={handleUpdate}
              className="pl-5 pr-5 flex items-center gap-3 px-2.5 py-2.5 top-4 left-4 bg-skin-infoBg hover:bg-skin-primary hover:text-white text-skin-primary"
              disabled={false}
              text="Update"
            >
              <FaCircleCheck size={24} />
            </PrimaryButton>
          </form>
        </article>
      </Modal>
    </header>
  );
}

export default ProfileHeader;
