'use client'

import {useState} from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import {Control, FieldValues, useForm, UseFormRegister} from 'react-hook-form';


import {FaEdit} from "react-icons/fa";
import { CustomInput } from '@/components/form-elements';
import { userSchema, UserSchema} from '@/schems';
import {IconButton} from '../icon-button';
import {Tables} from '@/types/database.types'

import { useChangeUser} from './useChangeUser'

interface IProps {
    user: Tables<'users'>
}


export const UserForm = ({ user }: IProps) => {
    const [isEditing, setEditing] = useState(false);
    const { mutation } = useChangeUser(() => setEditing(false));

    const methods = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        mode: 'onTouched',
        defaultValues: {
           email: user?.email || '',
           name: user?.name || '',
        }
    });

    const { handleSubmit, control, register, reset, formState: { errors, isValid, isSubmitting },  } = methods;


    const allowSubmit = !isSubmitting && isEditing && !mutation.isPending ;

    const onSubmit = async (formData: UserSchema) => {
        if(!isValid || !allowSubmit) return;
        if(user?.name !== formData.name)  {
            mutation.mutate(formData.name)
        }

    }

    return (
        <>
            <div className={'flex justify-end items-center px-2 py-6'}>
                <IconButton onClick={() => {
                    if(isEditing) {
                        reset()
                    }
                    setEditing(prevState => !prevState);
                }}>
                    <FaEdit size={24} color={'oklch(62.3% 0.214 259.815)'} />
                </IconButton>

            </div>
            <form className={'w-full p-1'} onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    className={'mb-4'}
                    key={'email'}
                    control={control as unknown as Control}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    disabled={true}
                    error={(errors.email?.message || '') as unknown as string}
                    name='email'
                    label={isEditing ? 'Email (It is not allowed to change)' : 'Email'}
                    type="email" placeholder="Enter email ..." />
                <CustomInput
                    key={'name'}
                    control={control as unknown as Control}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    disabled={!allowSubmit}
                    error={(errors.name?.message || '') as unknown as string}
                    name='name'
                    label={'User name'}
                    type="text" placeholder="Enter name ..." />
                {isEditing && (<button
                        type={'submit'}
                        disabled={!allowSubmit}
                        className={!allowSubmit ? 'bg-blue-500  text-white font-bold py-2 px-4 rounded mt-6 w-full opacity-50' :
                            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full hover:cursor-pointer'}>Submit</button>

                )}

            </form>

        </>
    )
}