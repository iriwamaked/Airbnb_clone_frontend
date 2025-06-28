import {createSlice} from '@reduxjs/toolkit';

const initialState={
    location: {
        country: '',
        region: '',
        city: '', 
        street: '',
        houseNumber: '',
        lat: null, //Широта
        lng: null,  //Долгота
    },
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = { ...state.location, ...action.payload };
    },
    clearLocation: (state) => {
      state.location = {
        country: '',
        region: '',
        city: '',
        street: '',
        houseNumber: '',
        lat: null,
        lng: null,
      };
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;