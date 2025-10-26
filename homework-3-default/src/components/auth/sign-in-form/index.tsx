'use client'

import {useSignIn,} from '@clerk/nextjs';
import {zodResolver} from '@hookform/resolvers/zod';
import {Control, FieldValues, useForm, UseFormRegister} from 'react-hook-form';
import {useRouter,} from 'next/navigation';
import {toast} from 'react-toastify';
import {AuthButton} from '../auth-button';
import { CustomInput } from '@/components/form-elements';
import { useMutation } from '@tanstack/react-query';

import {signInSchema, SignInSchema} from '@/schems';
import {toastOptions} from '@/config';
import {EAuthProvider} from "@/types";


export const SignInForm = () => {
    const router = useRouter();
    const { isLoaded, signIn, setActive,  } = useSignIn();

    const methods = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { handleSubmit, control, register, formState: { errors, isValid, isSubmitting },  } = methods;

    const authMutation = useMutation({
        mutationFn: async (provider: EAuthProvider) => {
            await signIn?.authenticateWithRedirect({
                strategy: provider === EAuthProvider.google ? 'oauth_google' : 'oauth_github',
                redirectUrlComplete: "/profile",
                redirectUrl: "/sign-in",
            });
        },
        onError: (error, provider) => {
            const message = error?.message || `Something went wrong with authentication through ${provider === EAuthProvider.google ? 'Google' : 'HitHub'}`;
            toast.error(message, toastOptions);
        }
    });

    const submitMutation = useMutation({
        mutationFn: async (data: SignInSchema) => {
            const signInAttempt = await signIn?.create({
                password: data.password,
                identifier: data.email
            });
            if(signInAttempt?.status !== 'complete') throw new Error('Something went wrong');
            if(setActive) {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/profile');
            }

        },
        onError: (err) => {
            const message = err?.message || 'Something went wrong' as unknown as string;
            toast.error(message, toastOptions);
        }
    })

    const loading = authMutation.isPending || submitMutation.isPending || !isLoaded || isSubmitting;


    const onSubmit = async (data: SignInSchema) => {
        if(loading || !isValid) return;
        await submitMutation.mutate(data);
    }


    return (
        <div className={'w-full max-w-xl mx-auto'}>
            <div className={'w-full flex gap-4'}>
                <AuthButton
                    provider={EAuthProvider.google}
                    onClick={() => !loading && authMutation.mutate(EAuthProvider.google)}
                    isLoaded={loading} />
                <AuthButton
                    provider={EAuthProvider.github}
                    onClick={ () => !loading && authMutation.mutate(EAuthProvider.github)}
                    isLoaded={loading} />

            </div>
            <form className={'w-full p-1 mt-6'} onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    key={'email'}
                    control={control as unknown as Control}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    disabled={loading}
                    error={(errors.email?.message || '') as unknown as string}
                    name='email'
                    label={'Enter email'}
                    type="text" placeholder="Enter email" className={'mb-3'} />
                <CustomInput
                    key={'password'}
                    control={control as unknown as Control}
                    register={register as unknown as UseFormRegister<FieldValues>}
                    disabled={loading}
                    error={(errors.password?.message || '') as unknown as string}
                    name='password'
                    label={'Enter password'}
                    type="password" placeholder="Enter password" />
                <button
                    type={'submit'}
                    disabled={loading}
                    className={loading ? 'bg-blue-500  text-white font-bold py-2 px-4 rounded mt-6 w-full opacity-50' :
                        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full hover:cursor-pointer'}>Login</button>
            </form>

        </div>

    )
}