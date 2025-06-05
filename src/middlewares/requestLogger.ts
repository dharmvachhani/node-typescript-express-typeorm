
import type { NextFunction, Request, Response, RequestHandler } from "express";
import { randomUUID } from "node:crypto";
import { Context } from "@utils/context";
import logger from "@utils/logger";


const addRequestId: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const existingId = req.headers["x-request-id"] as string;
    const requestId = existingId || randomUUID();
    req.headers["x-request-id"] = requestId;
    res.setHeader("X-Request-Id", requestId);
    next();
};

const requestContextMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const ctx = {
        ip: req.ip || req.headers["x-forwarded-for"] || req.connection?.remoteAddress,
        url: req.originalUrl || req.url,
        method: req.method,
        reqId: req.headers["x-request-id"]
    };

    Context.run(ctx, () => next());
}

const logRequest: RequestHandler = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const { success, message } = res.locals.responseBody || {};
        const duration = Date.now() - startTime;
        logger.info({
            name: 'REQUEST_LOG',
            data: {
                requestBody: req.body || null,
                requestParams: req.params || null,
                requestQuery: req.query || null,
                statusCode: res.statusCode,
                responseTimeMs: duration,
                responseBody: { success, message }
            },
        });
    });

    res.on('close', () => {
        if (!res.writableEnded) {
            logger.error({
                name: 'REQUEST_ABORTED',
                data: {
                    requestBody: req.body || null,
                    requestParams: req.params || null,
                    requestQuery: req.query || null,
                },
            });
        }
    });

    next();
};

export default [addRequestId, requestContextMiddleware, logRequest];