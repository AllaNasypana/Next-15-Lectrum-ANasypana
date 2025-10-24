'use client'

import { FC } from 'react'
import { useFormContext } from 'react-hook-form';
import { CustomInput } from '@/components/form-elements';

interface IProps {
    isLoaded: boolean;
}

export const CodeVerifyForm:FC<IProps> = ({isLoaded}) => {

    const {register, control, formState: {errors}} = useFormContext();

    return (
        <>
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