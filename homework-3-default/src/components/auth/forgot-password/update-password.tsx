'use client'

import { FC } from 'react'
import { useFormContext } from 'react-hook-form';
import { CustomInput } from '@/components/form-elements';

interface IProps {
    isLoaded: boolean;
}

export const UpdatePasswordForm:FC<IProps> = ({isLoaded}) => {

    const {register, control, formState: {errors}} = useFormContext();

    return (
        <>
            <CustomInput
                key={'password'}
                control={control}
                register={register}
                disabled={isLoaded}
                error={(errors.password?.message || '') as unknown as string}
                name='password'
                label={'Enter password'}
                className={'mb-4'}
                type="password" placeholder="Enter password" />
            <CustomInput
                key={'confirmPassword'}
                control={control}
                register={register}
                disabled={isLoaded}
                error={(errors.confirmPassword?.message || '') as unknown as string}
                name='confirmPassword'
                label={'Confirm password'}
                className={'mb-4'}
                type="password" placeholder="Confirm password" />
            <CustomInput
                key={'code'}
                control={control}
                register={register}
                disabled={isLoaded}
                error={(errors.code?.message || '') as unknown as string}
                name='code'
                label={'Enter code from your email'}
                type="text" placeholder="Enter code" />

        </>
    )
}