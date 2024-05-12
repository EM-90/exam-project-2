import React, { useState } from "react";
import LoginForm from "../../components/forms/loginForm";
import RegisterForm from "../../components/forms/registerForm";
import { useAuth } from '../../context/authContext';
import ProfileHeader from "../../components/profileContent/profileHeader";
import VenueForm from "../../components/forms/venueForm";
import Modal from "../../components/modal";
import PrimaryButton from "../../components/buttons/primaryButton";

function Profile() {
    const { user } = useAuth();
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const toggleForm = () => setShowRegisterForm(prev => !prev);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(prev => !prev);

    return (
        <main>
            {user ? (
                <>
                    <ProfileHeader />
                    <section className="container mx-auto my-7 px-7 z-10">
                        <PrimaryButton  text="Add Venue" onClick={toggleModal} className="  px-60 py-2.5 bg-skin-createBg  text-skin-tagTextColor outline-dashed outline-cyan-950 shadow-none" disabled={false} />
                        <Modal isOpen={showModal} onClose={toggleModal}>
                            <VenueForm />
                        </Modal>
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


