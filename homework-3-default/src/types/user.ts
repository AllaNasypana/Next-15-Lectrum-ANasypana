export enum ERole {
    'superadmin' = 'superadmin',
    'admin' = 'admin',
    'manager' = 'manager'
}

export type ActionResultLogin = {
    status: 'success' | 'error';
    error?: string | {email?: string[], password?: string[], name?: string[], role?: string[] };
}

