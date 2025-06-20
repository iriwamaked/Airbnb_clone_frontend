import {createSelector} from 'reselect';

const selectedDateRange = (state)=>state.dateRange;
export const selectedStartDate = createSelector(
    [selectedDateRange],
    (dateRange)=>{
        if(!dateRange.startDate) return null;
        return new Date(dateRange.startDate);
    }
)

export const selectedEndDate= createSelector(
    [selectedDateRange],
    (dateRange)=>{
        if(!dateRange.endDate) return null;
        return new Date(dateRange.endDate);
    }
)