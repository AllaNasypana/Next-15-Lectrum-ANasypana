import {z} from 'zod';
import { ERole } from '@/types';

export const loginSchema = z.object({
    email: z.email(),
    role: z.enum(Object.keys(ERole)),
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters'
    })
});

export type LoginSchema = z.infer<typeof loginSchema>;