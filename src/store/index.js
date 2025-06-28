import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import verificationReducer from './slices/verificationSlice';

import dateRangeReducer from './slices/dataRangeSlice';
import guestsReducer from './slices/guestSlice';
import locationReducer from './slices/locationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    verification: verificationReducer,
    dateRange: dateRangeReducer,
    guests: guestsReducer,
    location: locationReducer,
  },
});
