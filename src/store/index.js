import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import verificationReducer from './slices/verificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    verification: verificationReducer,
  },
});
