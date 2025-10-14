
export const rootRoutes = [ '/',];
export const authRoutes = [
    '/logout',
    '/login',
];
export const publicRoutes = [
    ...rootRoutes,
    ...authRoutes,
];
export const notAllowedAdmin = ['/setting'];
export const notAllowedManager = [...notAllowedAdmin, '/news'];

 export const redirects = [
    {
        source: '/setting',
        destination: '/new-setting',
        permanent: true,
    },
];






