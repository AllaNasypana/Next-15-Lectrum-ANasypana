'use client'
import {useState} from 'react';
import {useSignIn} from '@clerk/nextjs';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import {useRouter,} from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {toast} from 'react-toastify';
import { ResetPasswordForm } from './reset-password-form';
import {UpdatePasswordForm} from './update-password';

import {toastOptions} from '@/config';
import {resetPasswordSchema, updatePasswordSchema, ResetPasswordSchema, UpdatePasswordSchema} from '@/schems';




const stepSchemas = [resetPasswordSchema, updatePasswordSchema];


export const ForgotPasswordForm = () => {
    const router = useRouter();
    const { isLoaded, signIn, setActive,  } = useSignIn();
    const [activeStep, setActiveStep] = useState(0);

    const currentValidationSchema = stepSchemas[activeStep];
    const methods = useForm<ResetPasswordSchema | UpdatePasswordSchema>({
        resolver: zodResolver(currentValidationSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            code: '',
            password: '',
            confirmPassword: ''
        }
    });

    const { handleSubmit,  formState: {  isValid, isSubmitting } } = methods;

    const {isPending, mutate } = useMutation({
        mutationFn: async (data: {data: ResetPasswordSchema | UpdatePasswordSchema, step: number} ) => {
            if(data.step === 0) {
                const formData = data.data as unknown as ResetPasswordSchema;
                await signIn?.create({
                    strategy: 'reset_password_email_code',
                    identifier: formData.email,
                });
                setActiveStep(1);
                return
            }

            if (data.step === 1) {
                const formData = data.data as unknown as UpdatePasswordSchema;
                const result = await signIn?.attemptFirstFactor({
                    strategy: 'reset_password_email_code',
                    code: formData.code,
                    password: formData.password,
                })
                if(result?.status !== "complete") throw new Error('Something went wrong');
                if(setActive) {
                    await setActive({ session: result.createdSessionId });
                    router.replace('/profile');
                }

                setActiveStep(0);
            }
        },
        onError: error => {
            const message = error?.message || 'Something went wrong';
            setActiveStep(0)
            toast.error(message, toastOptions);
        }
    })



    const loading =  !isLoaded || isSubmitting || isPending;

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ResetPasswordForm isLoaded={loading} />
            case 1:
                return <UpdatePasswordForm isLoaded={loading} />
            default:
                return 'Unknown step';
        }
    }

    const onSubmit = async (data: ResetPasswordSchema | UpdatePasswordSchema) => {
        if(loading || !isValid) return;
        mutate({data: data, step: activeStep});
    }


    return (
        <div className={'w-full max-w-xl mx-auto'}>

            <FormProvider {...methods}>
                <form className={'w-full p-1 mt-6'} onSubmit={handleSubmit(onSubmit)}>
                    {getStepContent(activeStep)}
                    <button
                        type={'submit'}
                        disabled={loading}
                        className={loading ? 'bg-blue-500  text-white font-bold py-2 px-4 rounded mt-6 w-full opacity-50' :
                            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full hover:cursor-pointer'}>
                        {!activeStep ? 'Send password to reset code' : 'Submit'}
                    </button>
                </form>
            </FormProvider>


        </div>

    )
}