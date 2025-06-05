import type { Request, Response } from "express";
import { rateLimit, RateLimitExceededEventHandler } from "express-rate-limit";
import logger from "@utils/logger";
import { sendResponse } from "@utils/response";

const handler: RateLimitExceededEventHandler = (req: Request, res: Response) => {
	logger.warn({
		name: "RATE_LIMIT_EXCEEDED",
		data: {
			ip: req.ip,
			method: req.method,	
			originalUrl: req.originalUrl,
			headers: req.headers,
		},
	});
	return sendResponse({
		res,
		success: false,
		message: "Too many requests, please try again later.",
		statusCode: 429,
	})
};

const rateLimiter = rateLimit({
	legacyHeaders: true,
	limit: 10,
	handler,
	standardHeaders: true,
	windowMs: 10 * 60 * 1000,
	keyGenerator: (req: Request) => req.ip as string,
});

export default rateLimiter;
