import { z } from 'zod';
import { errorMessages } from '../constants/errorMessages';
import { countries } from '../constants/countries';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const schema = z
  .object({
    id: z.number().optional(),
    name: z
      .string()
      .min(1, { message: errorMessages.name })
      .regex(/^[A-Z]/, { message: errorMessages.nameUppercase }),
    age: z
      .number({ message: errorMessages.age })
      .positive({ message: errorMessages.agePositive }),
    email: z
      .string()
      .min(1, { message: errorMessages.email })
      .email({ message: errorMessages.emailInvalid }),
    password: z
      .string()
      .min(1, { message: errorMessages.password })
      .min(8, { message: errorMessages.passwordLength })
      .regex(/[A-Z]/, { message: errorMessages.passwordUppercase })
      .regex(/[a-z]/, { message: errorMessages.passwordLowercase })
      .regex(/\d/, { message: errorMessages.passwordNumber })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: errorMessages.passwordSpecial,
      }),
    passwordConfirm: z
      .string()
      .min(1, { message: errorMessages.passwordConfirm }),
    gender: z.enum(['male', 'female', 'other', ''], {
      message: errorMessages.gender,
    }),
    country: z.enum(countries, { message: errorMessages.country }),
    picture: z
      .any()
      .refine((files) => files?.length === 1, errorMessages.picture)
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        errorMessages.pictureSize
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        errorMessages.pictureType
      ),
    acceptTerms: z.boolean().refine((value) => value, {
      message: errorMessages.terms,
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: errorMessages.passwordMatch,
  });

export type TFormData = z.infer<typeof schema>;
