
export const rootRoutes = [ '/',];
export const authRoutes = [
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/forgot-password(.*)',
];

export const publicRoutes = [
    ...rootRoutes,
    ...authRoutes,
];









