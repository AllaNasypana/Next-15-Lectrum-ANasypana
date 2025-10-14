'use client'
import {  useRouter,  } from 'next/navigation';
import { CustomInput} from '../custom-input';
import { RadioButtons } from '../radio-buttons'
import {useState } from 'react';
import { LoginSchema } from '@/schems';
import {ActionResultLogin, ERole} from "@/types";


type RoleStrings = keyof typeof ERole;

interface IProps {
    onLogin: (data: LoginSchema) =>  Promise<ActionResultLogin>
}

export const LoginForm = ({ onLogin}: IProps) => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<RoleStrings>(ERole.manager as unknown as RoleStrings);
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading]= useState(false);

    return (
        <form className={'w-full max-w-xl mx-auto'} onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const res = await onLogin({email, password, name, role });

            if(res.status === 'success'){
                router.push('/');
                return
            }

            if(res.error){
                console.log(res.error)
                if(typeof res.error === 'string'){
                    setError(res.error);
                }
                if(typeof res.error !== 'string' && !!res?.error?.password){
                    setPasswordError(res?.error?.password.join('; '))
                }
                if( typeof res.error !== 'string' && !!res?.error?.email){
                    setEmailError(res?.error?.email.join('; '))
                }
                if( typeof res.error !== 'string' && !!res?.error?.name){
                    setNameError(res?.error?.name.join('; '))
                }
                if( typeof res.error !== 'string' && !!res?.error?.role){
                    setRoleError(res?.error?.role.join('; '))
                }
            }

            setLoading(false);

        }} >
            <CustomInput
                disabled={loading}
                error={nameError}
                name='name'
                label={'Your name'}
                value={name}
                onChange={(e) => {
                    if(nameError) {
                        setNameError('')
                    }
                    if(error){
                        setError('')
                    }


                    setName(e.target.value)
                } }
                type="text" placeholder="Enter email" className={'mb-3'} />
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

            <RadioButtons
                label={'Select role'}
                value={role}
                name={'role'}
                error={roleError}
                onChange={(e) => {
                    if(roleError) {
                        setRoleError('')
                    }
                    const data = e?.target?.value as unknown as RoleStrings;
                    setRole(data)
                }}
                options={Object.keys(ERole).map((key) => ({value: key, label: key[0].toUpperCase() + key.slice(1) }))} />

            {error && (<p className={'mt-1 text-sm italic text-red-600 mt-3'}>{error}</p>)}
            <button
                disabled={loading}
                className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full'} type={'submit'}>Login</button>
        </form>
    )
}