import {z} from 'zod';


export const postSchema = z.object({
    title:  z.string().min(2, {
        message: 'Title must be at least 2 characters'
    }).max(200, {
        message: 'Title must be at max 200 characters'
    }),
    description: z.string().max(600, {
        message: 'Description must be at max 600 characters'
    }).optional(),
});

export type PostSchema = z.infer<typeof postSchema>;