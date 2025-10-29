"use client";

import { ReactNode } from 'react'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export const Providers = ({children}: {children: ReactNode}) => {
    return (
        <>
            <ToastContainer newestOnTop transition={Slide} />
            <QueryClientProvider client={queryClient}>

                {children}
            </QueryClientProvider>
        </>
    )
}