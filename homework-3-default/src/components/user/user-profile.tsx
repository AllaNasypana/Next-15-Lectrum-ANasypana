'use client'

import { useEffect} from "react";

import {  useQueryClient } from '@tanstack/react-query';
import { UserForm } from './user-form';
import { useChangeUser} from './useChangeUser'


export const UserProfile = () => {
    const queryClient = useQueryClient();

    const { query: {data, isPending, error, isSuccess } } = useChangeUser();

      useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['users']});
    }, [isSuccess]);

    return (
        <div className={'w-full flex-col items-center justify-center'}>
            {isPending && !error && (<p className={'py-6 text-center text-2xl font-bold text-blue-500'}>Loading...</p>)}
            {!isPending && error && <p className={'py-6 text-center text-2xl font-bold text-red-700'}>{error.message}</p>}
            {!isPending && !error && <UserForm user={data}/>}
        </div>
    )
}

