import React, { useState, useEffect } from "react";
import LoginForm from "../../components/forms/loginForm";
import RegisterForm from "../../components/forms/registerForm";
import { useAuth } from '../../context/authContext';
import ProfileHeader from "../../components/profileContent/profileHeader";
import VenueForm from "../../components/forms/venueForm";
import Modal from "../../components/modal";
import PrimaryButton from "../../components/buttons/primaryButton";
import { profileAPI } from "../../api/profiles";
import VenueManagerLi from "../../components/profileContent/venueManagerLi";
import getUserFromLocalStorage from "../../helpers/getFromLocalStorage";


function Profile() {
    const { user } = useAuth();
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const toggleForm = () => setShowRegisterForm(prev => !prev);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);
    const [venues, setVenues] = useState([]);

  
 
    useEffect(() => {
        const fetchData = async () => {
            if (user && user.name) {
                try {
                    const response = await profileAPI.fetchProfile(user.name);
                    setVenues(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch venues:', error);
                }
            }
        };

        fetchData();
    }, [user]);

    

    return (
        <main className="container mx-auto my-7 px-7 z-10">
            {user ? (
                <>
                    <ProfileHeader />
                    <section>
                        <PrimaryButton  text="Add Venue" onClick={toggleModal} className="  px-60 py-2.5 bg-skin-createBg  text-skin-tagTextColor outline-dashed outline-cyan-950 shadow-none" disabled={false} />
                        <Modal isOpen={showModal} onClose={toggleModal}>
                            <VenueForm />
                        </Modal>
                     </section>
                     <section>
                     <h2>Your Venues</h2>
                        {venues.map(venue => (
                            <VenueManagerLi key={venue.id} venue={venue} />
                        ))}
                     </section>
                </>
            ) : (
                <section>
                    {showRegisterForm ? (
                        <RegisterForm onLoginClick={toggleForm} />
                    ) : (
                        <LoginForm onRegisterClick={toggleForm} />
                    )}
                </section>
            )}
        </main>
    );
}

export default Profile;


