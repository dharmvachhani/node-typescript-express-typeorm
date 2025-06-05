import type { Response } from "express";

interface ResponseOptions {
    res: Response;
    success: boolean;
    message: string;
    data?: any;
    error?: any;
    statusCode?: number;
}

export const sendResponse = ({
    res,
    success,
    message,
    data,
    error,
    statusCode,
}: ResponseOptions): void => {
    const responsePayload: any = {
        success,
        message,
    };

    if (success && data !== undefined) {
        responsePayload.data = data;
    }

    if (!success && error !== undefined) {
        responsePayload.error = error;
    }

    res.locals.responseBody = { success, message };

    res.status(statusCode || (success ? 200 : 500)).json(responsePayload);
};
