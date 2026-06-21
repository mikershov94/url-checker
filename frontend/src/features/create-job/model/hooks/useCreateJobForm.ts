import type { AppDispatch, RootState } from '@app/store';
import { useDispatch, useSelector } from 'react-redux';

import { selectJob, useCreateJobMutation } from '@entities/job';
import { apiErrors } from '@shared';
import { resetForm, setError } from '../slices/createJobSlice';

export function useCreateJobForm() {
    const dispatch = useDispatch<AppDispatch>();

    const { urls, error } = useSelector((state: RootState) => state.createJob);

    const [createJob, { isLoading }] = useCreateJobMutation();

    const handleSubmit = async () => {
        const filteredUrls = urls.map((url) => url.trim()).filter(Boolean);

        if (filteredUrls.length === 0) {
            dispatch(setError('Добавьте хотя бы один URL'));
            return;
        }

        try {
            const response = await createJob({
                urls: filteredUrls,
            }).unwrap();

            dispatch(resetForm());
            dispatch(selectJob(response.jobId));
        } catch {
            dispatch(setError(apiErrors.CREATE_JOB_ERROR));
        }
    };

    return {
        urls,
        error,
        isLoading,
        handleSubmit,
    };
}
