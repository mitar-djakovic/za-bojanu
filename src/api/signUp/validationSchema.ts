import { object, ref, string } from 'yup';

export const signUpSchema = object({
	email: string().email('Please provide a valid email').required('Email is required'),
	firstName: string().required('First Name is required'),
	lastName: string().required('First Name is required'),
	password: string().required('Password is required'),
	confirmPassword: string()
		.oneOf([ref('password'), undefined], 'Passwords must match')
		.required('Confirm password is required'),
});
