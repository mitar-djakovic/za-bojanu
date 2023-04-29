import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

import { BaseError, ConflictError, InternalError } from '../../middleware';
import { prisma } from '../../utils';

interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const signUpService = async (data: SignUpData) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
            },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new ConflictError('Email already in use.');
        } else if (error instanceof BaseError) {
            throw new InternalError(error.message);
        } else {
            throw new InternalError(
                'Something went wrong while creating your account. Please try again later'
            );
        }
    }
};
