import { object, string } from 'yup';

export const logInSchema = object({
	email: string().email('Please provide a valid email').required('Email is required'),
	password: string().required('Password is required'),
});
