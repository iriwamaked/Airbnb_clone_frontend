import { createSlice } from '@reduxjs/toolkit';

const googleApiSlice = createSlice({
  name: 'googleApi',
  initialState: {
    ready: false,
  },
  reducers: {
    setReady(state, action) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = googleApiSlice.actions;
export default googleApiSlice.reducer;