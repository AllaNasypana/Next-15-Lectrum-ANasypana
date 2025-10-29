import { NextResponse, NextRequest } from 'next/server';
import { publicRoutes, authRoutes } from './routes'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([...publicRoutes]);
const isAuthRoute = createRouteMatcher([...authRoutes]);


export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();
    if (!userId && !isPublicRoute(req)) {
        return redirectToSignIn();
    }
    if(userId && isAuthRoute(req)) {
        return NextResponse.redirect(new URL('/', req.url))
    }
})


export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}