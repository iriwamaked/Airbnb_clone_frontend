import { createSlice } from "@reduxjs/toolkit";

const initialState={
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
};

const guestSlice = createSlice({
    name: 'guests',
    initialState,
    reducers: {
        setGuests: (state, action)=>{
            return {...state, ...action.payload};
        },
        resetGuests:()=>initialState
    }
});

export const {setGuests, resetGuests} = guestSlice.actions;
export default guestSlice.reducer;