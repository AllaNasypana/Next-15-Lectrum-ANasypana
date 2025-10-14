"use client";

import { ReactNode } from 'react'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Providers = ({children}: {children: ReactNode}) => {
    return (
        <>
            <ToastContainer newestOnTop transition={Slide} />
            {children}
        </>
    )
}