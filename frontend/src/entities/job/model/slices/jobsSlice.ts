import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JobInfo } from '../types/job-info';

interface JobsState {
    items: JobInfo[];
    selectedJobId: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: JobsState = {
    items: [],
    selectedJobId: null,
    isLoading: false,
    error: null,
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        selectJob(state, action: PayloadAction<string>) {
            state.selectedJobId = action.payload;
        },
    },
});

export const { selectJob } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
