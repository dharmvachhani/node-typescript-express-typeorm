import type { Request, Response, ErrorRequestHandler, RequestHandler } from "express";
import { generateError } from "@utils/error";
import { sendResponse } from "@utils/response";

const notFoundRequest: RequestHandler = (req: Request, res: Response) => {
	return sendResponse({
		res,
		success: false,
		message: "The endpoint you are trying to access does not exist.",
		statusCode: 404,
	});
};

export const globalErrorHandler: ErrorRequestHandler = (err, _req: Request, res: Response) => {
	const error = generateError("GLOBAL_EXCEPTION", err)

	res.locals.error = error;

	return sendResponse({
		res,
		success: false,
		message: error.message,
		statusCode: error.status,
	});
};

export const errorHandler: [RequestHandler, ErrorRequestHandler] = [notFoundRequest, globalErrorHandler];
