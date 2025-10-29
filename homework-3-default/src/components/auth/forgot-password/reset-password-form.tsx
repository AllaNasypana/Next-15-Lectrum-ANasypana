'use client'

import { FC } from 'react'
import { useFormContext} from 'react-hook-form';
import { CustomInput } from '@/components/form-elements';

interface IProps {
    isLoaded: boolean;
}

export const ResetPasswordForm:FC<IProps> = ({isLoaded}) => {
    const {register, control, formState: {errors}} = useFormContext();

    return (
        <>
            <CustomInput
                key={'email'}
                control={control}
                register={register}
                disabled={isLoaded}
                error={(errors.email?.message || '') as unknown as string}
                name='email'
                label={'Enter email'}
                type="text" placeholder="Enter email" className={'mb-3'} />

        </>
    )
}