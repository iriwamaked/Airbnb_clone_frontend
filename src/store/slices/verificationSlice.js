import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0, // 0: type, 1: info, 2: photo, 3: finish
 data: {
  documentType: "",
  documentNumber: "",
  issuedBy: "",
  issueDate: "",
  selfieImage: null,
  documentImage: null,
},

};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    setStep(state, action) {
      state.currentStep = action.payload;
    },
    nextStep(state) {
      if (state.currentStep < 3) {
    state.currentStep += 1;
  }
    },
    prevStep(state) {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setDocumentType(state, action) {
      state.data.documentType = action.payload;
    },
    setDocumentNumber(state, action) {
      state.data.documentNumber = action.payload;
    },
    setIssuedBy(state, action) {
      state.data.issuedBy = action.payload;
    },
    setIssueDate(state, action) {
      state.data.issueDate = action.payload;
    },
    setFrontImage(state, action) {
      state.data.frontImage = action.payload;
    },
    setBackImage(state, action) {
      state.data.backImage = action.payload;
    },
    resetVerification(state) {
      Object.assign(state, initialState);
    },
    setSelfieImage(state, action) {
  state.data.selfieImage = action.payload;
},
setDocumentImage(state, action) {
  state.data.documentImage = action.payload;
},

  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setDocumentType,
  setDocumentNumber,
  setIssuedBy,
  setIssueDate,
  setSelfieImage,
  setDocumentImage,
  resetVerification,
} = verificationSlice.actions;


export default verificationSlice.reducer;
