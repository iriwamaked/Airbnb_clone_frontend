import { createSlice } from '@reduxjs/toolkit';

const googleApiSlice = createSlice({
  name: 'googleApi',
  initialState: { ready: false },
  reducers: {
    setGoogleApiReady(state, action) {
      state.ready = action.payload;
    },
  },
});

export const { setGoogleApiReady } = googleApiSlice.actions;
export default googleApiSlice.reducer;