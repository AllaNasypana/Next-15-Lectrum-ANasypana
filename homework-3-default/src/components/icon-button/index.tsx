'use client'

import {ReactNode} from 'react'

interface IProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
}

export const IconButton = ({children, onClick, type}: IProps) => {

    return (
        <button
            type={type || 'button'}
            className={'hover:cursor-pointer flex p-3 rounded-full hover:shadow-lg color-blue-500'}
            onClick={() => onClick && onClick()}>
            {children}
        </button>
    )

}