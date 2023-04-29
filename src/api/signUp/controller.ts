import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

import { HttpStatusCode, validate } from '../../middleware';
import {signUpSchema} from "./validationSchema";
import {signUpService} from "./service";

router.post(
    '/signup',
    validate(signUpSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await signUpService(req.body);

            return res.status(HttpStatusCode.CREATED).json({
                status: HttpStatusCode.CREATED,
                message: 'Account created',
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;