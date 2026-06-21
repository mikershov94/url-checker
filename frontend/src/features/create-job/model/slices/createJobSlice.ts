import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { JobId } from '@entities/job';

export interface CreateJobState {
    urls: string[];
    isLoading: boolean;
    error: string | null;
    createdJobId: JobId | null;
}

const initialState: CreateJobState = {
    urls: [''],
    isLoading: false,
    error: null,
    createdJobId: null,
};

const createJobSlice = createSlice({
    name: 'createJob',
    initialState,
    reducers: {
        addUrl(state) {
            state.urls.push('');
        },
        removeUrl(state, action: PayloadAction<number>) {
            state.urls = state.urls.filter((_, index) => index !== action.payload);
        },
        changeUrl(
            state,
            action: PayloadAction<{
                index: number;
                value: string;
            }>,
        ) {
            state.urls[action.payload.index] = action.payload.value;
        },
        resetForm(state) {
            state.urls = [''];
            state.error = null;
            state.createdJobId = null;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { addUrl, removeUrl, changeUrl, resetForm, setError } = createJobSlice.actions;

export const createJobReducer = createJobSlice.reducer;
