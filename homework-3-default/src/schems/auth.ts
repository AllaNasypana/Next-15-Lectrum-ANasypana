import {z} from 'zod';


export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(7, {
        message: 'Password must be at least 7 characters'
    })
});

export const verifyCodeSchema = z.object({
    code: z.string().min(6, {
        message: 'Please check code.'
    })
});


export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(7, {
        message: 'Password must be at least 7 characters'
    }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});


export const resetPasswordSchema = z.object({
    email: z.email(),

});

export const updatePasswordSchema = z.object({
    code: z.string().min(6, {
        message: 'Please check code.'
    }),
    password: z.string().min(7, {
        message: 'Password must be at least 7 characters'
    }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});


export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type VerifyCodeSchema = z.infer<typeof verifyCodeSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;