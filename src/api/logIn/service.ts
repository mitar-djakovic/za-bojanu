import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

import {
	BaseError,
	InternalError,
	NotFoundError,
	UnauthorizedError,
} from '../../middleware';
import { prisma } from '../../utils';

interface LogInData {
	email: string;
	password: string;
}

export const logInService = async ({ email, password }: LogInData) => {
	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				email,
			},
		});
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw new UnauthorizedError('Credentials are wrong, please try again');
		}

		return user;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				throw new NotFoundError('Credentials are wrong, please try again');
			} else {
				throw new InternalError('Something went wrong, please try again later');
			}
		} else if (error instanceof BaseError) {
			throw new UnauthorizedError('Credentials are wrong, please try again');
		} else {
			throw new InternalError('Something went wrong, please try again later');
		}
	}
};
