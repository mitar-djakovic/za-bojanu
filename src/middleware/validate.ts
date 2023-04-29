import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';

type Errors = {
	[key: string]: string;
};

const validate =
	(schema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.body, { abortEarly: false });
		} catch (e) {
			if (e instanceof ValidationError) {
				const errors: Errors = {};

				e.inner.map((err) => {
					if (err.path) {
						errors[err.path] = err.errors[0];
					}
				});

				const response = {
					errors,
					status: 422,
				};

				return res.status(422).json(response).end();
			}

			next(e);

			res.status(402).end();
		}

		next();
	};

export default validate;
