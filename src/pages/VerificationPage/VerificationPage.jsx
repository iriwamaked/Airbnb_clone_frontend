import { useSelector } from "react-redux";
import styles from "./VerificationPage.module.css";
import StepPassport from "./Steps/StepPassport";
import StepDocumentForm from "./Steps/StepDocumentForm";
import StepPhotoUpload from "./Steps/StepPhotoUpload";
import StepDone from "./Steps/StepDone";

const VerificationPage = () => {
  const step = useSelector((state) => state.verification.currentStep);

  return (
    <div className={styles.container}>
      {step === 0 && <StepDocumentForm />}
      {step === 1 && <StepPassport />}
      {step === 2 && <StepPhotoUpload />}
      {step === 3 && <StepDone />}
    </div>
  );
};

export default VerificationPage;
