import { NextFunction, Request, Response } from 'express';

import { BaseError } from './errors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof BaseError) {
		return res
			.status(err.httpCode)
			.json({ name: err.name, status: err.httpCode, message: err.message });
	}
	next();
};
