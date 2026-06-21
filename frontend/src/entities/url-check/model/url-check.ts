import type { UrlCheckErrorMessage } from './url-check-errors';
import type { UrlCheckStatus } from './url-check-status';

export interface UrlCheck {
    url: string;
    status: UrlCheckStatus;
    httpCode?: number;
    errorMessage?: UrlCheckErrorMessage;
    startedAt?: Date;
    endedAt?: Date;
    duration?: number;
}
