import { NextFunction } from "express";
import logger from "@utils/logger";

type ErrorPayload = {
    name?: string;
    message: string;
    status?: number;
    error?: Error;
};

export class GenerateError extends Error {
    public status: number;

    constructor({ name = 'GenerateError', message, status = 500, error }: ErrorPayload) {
        super(message);
        this.name = name;
        this.status = status;

        Object.setPrototypeOf(this, new.target.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GenerateError);
        }

        if (error?.stack) {
            this.stack = `Caused by: ${error.stack}`;
        }
    }
}

const wrapError = (name: string, error: unknown): GenerateError => {
    let wrappedError: GenerateError;

    if (error instanceof GenerateError) {
        return error;
    } else if (error instanceof Error) {
        wrappedError = new GenerateError({
            name,
            message: error.message,
            status: 500,
            error,
        });
    } else {
        wrappedError = new GenerateError({
            name,
            message: 'An unexpected error occurred',
            status: 500,
        });
    }

    logger.error({
        name,
        data: {
            message: wrappedError.message,
            status: wrappedError.status,
            stack: wrappedError.stack,
            originalError: error,
        },
    });

    return wrappedError;
};

export const handleError = (name: string, error: unknown): never => {
    throw wrapError(name, error);
};

export const handleControllerError = (
    name: string,
    error: unknown,
    next: NextFunction
): void => {
    next(wrapError(name, error));
};

export const throwAppError = ({
    name,
    message,
    status = 400,
}: {
    name: string;
    message: string;
    status?: number;
}): never => {
    logger.error({
        name,
        data: { message, status },
    });

    throw new GenerateError({ name, message, status });
};

export const generateError = (name: string, error: unknown): GenerateError => {
    return wrapError(name, error);
};
