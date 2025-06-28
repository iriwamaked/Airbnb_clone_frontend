import { createSlice } from "@reduxjs/toolkit";

const initialState={
    startDate: null,
    endDate: null
}

const dateRangeSlice= createSlice(
    {
        name: 'dateRange',
        initialState,
        reducers:{
            setDateRange(state,action){
                const [start,end] = action.payload;
                state.startDate=start;
                state.endDate=end;
            },
            clearDateRange(state){
                state.startDate=null;
                state.endDate=null;
            }
        }
    });

    export const {setDateRange, clearDateRange} = dateRangeSlice.actions;
    export default dateRangeSlice.reducer;