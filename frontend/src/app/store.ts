import { configureStore } from '@reduxjs/toolkit';

import { createJobReducer } from '@features/create-job';
import { jobsReducer } from '@entities/job';
import { rtkApi } from '@shared';

export const store = configureStore({
    reducer: {
        [rtkApi.reducerPath]: rtkApi.reducer,
        createJob: createJobReducer,
        jobs: jobsReducer,
    },
    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
