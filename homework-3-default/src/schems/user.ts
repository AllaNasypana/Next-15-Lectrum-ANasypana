import {z} from 'zod';

export const userSchema = z.object({
    email: z.email(),
    name: z.string().min(4, {
        message: 'Name must be at least 4 characters'
    }).max(64, {
        message: 'Name must be at max 64 characters'
    }),
    image: z.string().optional()

});

export type UserSchema = z.infer<typeof userSchema>;