import { useState } from "react";
import Modal from "@/components/Modal/Modal.jsx";
import SignInForm from "@/components/Authorization/SignInForm/SignInForm";
import RegisterForm from "@/components/Authorization/RegisterForm/RegisterForm";

const AuthModalWrapper = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitch = () => setIsRegistering(prev => !prev);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isRegistering ? (
        <RegisterForm onClose={onClose} onSwitch={handleSwitch} />
      ) : (
        <SignInForm onClose={onClose} onSwitch={handleSwitch} />
      )}
    </Modal>
  );
};

export default AuthModalWrapper;
