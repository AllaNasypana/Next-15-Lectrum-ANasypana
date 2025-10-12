import {z} from 'zod';

export const productSchema = z.object({
    id: z.number().int(),
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters'
    }).max(250, {message: 'Title must be least 250 characters'}),
    price: z.number().positive(),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters'
    }).max(500, {message: 'Description must be least 500 characters'}),
    category: z.string().min(2, {
        message: 'Category must be at least 2 characters'
    }).max(250, {message: 'Category must be least 250 characters'}),
    image: z.url(),
    rating: z.object({
        rate: z.number(),
        count: z.number(),
    }).optional(),
});

export type ProductsSchema = z.infer<typeof productSchema>;