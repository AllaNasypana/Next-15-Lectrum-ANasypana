'use client'
import {  useRouter,  } from 'next/navigation';
import { CustomInput} from '../custom-input';
import {useState } from 'react';
import { LoginSchema } from '@/schems';
import {ActionResultLogin} from "@/types";

interface IProps {
    onLogin: (data: LoginSchema) =>  Promise<ActionResultLogin>
}

export const LoginForm = ({ onLogin}: IProps) => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading]= useState(false);


    return (
        <form className={'w-full max-w-xl'} onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const res = await onLogin({email, password});

            if(res.status === 'success'){
                router.push('/todos');
                return
            }

            if(res.error){
                console.log(res.error)
                if(typeof res.error === 'string'){
                    setError(res.error);
                }
                if(typeof res.error !== 'string' && !!res?.error?.password){
                    setPasswordError(res?.error?.password[0])
                }
                if( typeof res.error !== 'string' && !!res?.error?.email){
                    console.log(res.error);
                    setEmailError(res?.error?.email[0])
                }
            }

            setLoading(false);

        }} >
            <CustomInput
                disabled={loading}
                error={emailError}
                name='email'
                label={'Email'}
                value={email}
                onChange={(e) => {
                    if(emailError) {
                        setEmailError('')
                    }
                    if(error){
                        setError('')
                    }


                    setEmail(e.target.value)
                } }
                type="email" placeholder="Enter email" className={'mb-3'} />
            <CustomInput
                disabled={loading}
                name={'password'}
                label={'Your Password'}
                error={passwordError}
                type="password"
                value={password}
                onChange={(e) => {
                    if(passwordError) {
                        setPasswordError('')
                    }
                    if(error){
                        setError('');
                    }
                    setPassword(e.target.value)
                } }
                placeholder="Enter password" />
            {error && (<p className={'mt-1 text-sm italic text-red-600 mt-3'}>{error}</p>)}
            <button
                disabled={loading}
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full'} type={'submit'}>Login</button>
        </form>
    )
}