'use client'
import {useState} from 'react';
import {useSignUp} from '@clerk/nextjs';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, FormProvider} from 'react-hook-form';
import {useRouter,} from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {toast} from 'react-toastify';

import { MainForm } from './main-form';
import {CodeVerifyForm} from './code-verify';
import {AuthButton} from '../auth-button';

import {signUpSchema, verifyCodeSchema, VerifyCodeSchema, SignUpSchema} from '@/schems';
import {toastOptions} from '@/config';
import {EAuthProvider} from "@/types";



const stepSchemas = [signUpSchema, verifyCodeSchema];


export const SignUpForm = () => {
    const router = useRouter();
    const { isLoaded, signUp, setActive,  } = useSignUp();
    const [activeStep, setActiveStep] = useState(0);

    const currentValidationSchema = stepSchemas[activeStep];
    const methods = useForm<SignUpSchema | VerifyCodeSchema>({
        resolver: zodResolver(currentValidationSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            code: ''
        }
    });

    const { handleSubmit, formState: { isValid, isSubmitting } } = methods;

    const authMutation = useMutation({
        mutationFn: async (provider: EAuthProvider) => {
            await signUp?.authenticateWithRedirect({
                strategy: provider === EAuthProvider.google ? 'oauth_google' : 'oauth_github',
                redirectUrlComplete: "/",
                redirectUrl: "/sign-in",
            });
        },
        onError: (error: Error) => {
            const message = error?.message || `Something went wrong with authentication through ${provider === EAuthProvider.google ? 'Google' : 'HitHub'}`;
            toast.error(message, toastOptions);
        }
    });

    const submitMutation = useMutation({
        mutationFn: async ( {data, step}: {data: SignUpSchema | VerifyCodeSchema, step: number}) => {
            if(step === 0) {
                const formData = data as unknown as SignUpSchema;
                await signUp?.create({
                    password: formData.password,
                    emailAddress: formData.email,
                    username: formData.name
                });
                await signUp.prepareEmailAddressVerification({strategy: "email_code"});
                setActiveStep(1);
                return
            }
            if (step === 1) {
                const formData = data as unknown as VerifyCodeSchema;
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: formData.code
                });
                if(completeSignUp.status !== "complete") throw new Error('Invalid code');
                await setActive({session: completeSignUp.createdSessionId});
                setActiveStep(0);
                router.push("/profile");
                return;
            }
        },
        onError: (error: Error) => {
            const message = error?.message || 'Something went wrong';
            setActiveStep(0)
            toast.error(message, toastOptions);
        }
    })

    const loading = submitMutation.isPending || authMutation.isPending || !isLoaded || isSubmitting;

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <MainForm isLoaded={loading} />
            case 1:
                return <CodeVerifyForm isLoaded={loading} />
            default:
                return 'Unknown step';
        }
    }

    const onSubmit = async (data: SignUpSchema | VerifyCodeSchema) => {
        if(loading || !isValid) return;
        await submitMutation.mutate({data, step: activeStep});
    }



    return (
        <div className={'w-full max-w-xl mx-auto'}>
            <div className={'w-full flex gap-4'}>
                <AuthButton
                    provider={EAuthProvider.google}
                    onClick={ () => !loading && authMutation.mutate(EAuthProvider.google)}
                    isLoaded={loading} />
                <AuthButton
                    provider={EAuthProvider.github}
                    onClick={ () => !loading && authMutation.mutate(EAuthProvider.github)}
                    isLoaded={loading} />

            </div>
            <FormProvider {...methods}>
                <form className={'w-full p-1 mt-6'} onSubmit={handleSubmit(onSubmit)}>
                    {getStepContent(activeStep)}
                    <button
                        type={'submit'}
                        disabled={loading}
                        className={loading ? 'bg-blue-500  text-white font-bold py-2 px-4 rounded mt-6 w-full opacity-50' :
                            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full hover:cursor-pointer'}>Submit</button>
                </form>
            </FormProvider>
            <div id="clerk-captcha"></div>
        </div>

    )
}