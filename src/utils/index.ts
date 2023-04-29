import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';

import { UnauthorizedError } from '../middleware';

interface Decoded {
	email: string;
	exp: number;
	iat: number;
}

const prisma = new PrismaClient();

const validateToken = async (token: string) => {
	const decoded: Decoded = await jwtDecode(token);

	if (decoded && decoded.exp) {
		const expirationTime = decoded.exp * 1000; // Convert to milliseconds
		const currentTime = Date.now();

		if (expirationTime < currentTime) {
			throw new UnauthorizedError('Verification link has expired, please request for new one');
		}
	} else {
		throw new UnauthorizedError(
			'Verification link has expired or link is invalid, please request for new one'
		);
	}

	return decoded.email;
};

export { prisma, validateToken };
