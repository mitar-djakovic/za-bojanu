import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

import { HttpStatusCode, validate } from '../../middleware';

import { logInService } from './service';
import { logInSchema } from './validationSchema';

router.post(
	'/login',
	validate(logInSchema),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await logInService(req.body);

			return res.cookie('hc', response?.id).status(HttpStatusCode.OK).json({
				status: HttpStatusCode.OK,
				message: 'Successful log in',
			});
		} catch (error) {
			next(error);
		}
	}
);

export default router;
