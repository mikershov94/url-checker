import type { AppDispatch } from '@app/store';
import type { FC } from 'react';
import { apiErrors, Button, Card, ErrorMessage, TextInput } from '@shared';
import { addUrl, changeUrl, removeUrl } from '../../model/slices/createJobSlice';

import styles from './CreateJobForm.module.scss';
import { useCreateJobForm } from '@features/create-job/model/hooks/useCreateJobForm';
import { useDispatch } from 'react-redux';

export const CreateJobForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { urls, error, isLoading, handleSubmit } = useCreateJobForm();

    return (
        <Card title="Новое задание">
            <label>URL's</label>
            {urls.map((url, index) => (
                <div key={index} className={styles.row}>
                    <TextInput
                        className={styles.textInput}
                        placeholder="https://example.com"
                        value={url}
                        onChange={(event) =>
                            dispatch(
                                changeUrl({
                                    index,
                                    value: event.currentTarget.value,
                                }),
                            )
                        }
                    />

                    {urls.length > 1 && (
                        <Button
                            variant="subtle"
                            color="red"
                            onClick={() => dispatch(removeUrl(index))}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            ))}

            <div className={styles.btns}>
                <Button variant="light" onClick={() => dispatch(addUrl())}>
                    + URL
                </Button>

                <Button loading={isLoading} onClick={handleSubmit}>
                    Создать
                </Button>
            </div>

            {error && <ErrorMessage>{apiErrors.CREATE_JOB_ERROR}</ErrorMessage>}
        </Card>
    );
};
