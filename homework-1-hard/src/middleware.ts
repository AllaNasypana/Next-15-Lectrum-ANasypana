import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers'

import {  publicRoutes } from './routes';


export async function middleware(req:NextRequest) {
    const {nextUrl: {pathname}} = req;
    const headerCookies= await cookies();
    const user = headerCookies?.get('user')

    const isLoggedIn = !!user && !!user.value;

    const isPublic = publicRoutes.includes(pathname);
    if(pathname === '/') {
        return NextResponse.redirect(new URL('/news', req.url))
    }

    if(!isLoggedIn && !isPublic) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if(isLoggedIn && pathname === '/login') {
        return NextResponse.redirect(new URL('/news', req.url))
    }

    if(isLoggedIn && pathname === '/logout') {
         const headerCookies= await cookies();
         await headerCookies.delete('user');
        return NextResponse.redirect(new URL('/news', req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)']
}