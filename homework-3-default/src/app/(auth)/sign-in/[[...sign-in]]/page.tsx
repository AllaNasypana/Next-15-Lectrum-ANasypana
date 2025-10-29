
import Link from 'next/link';
import { SignInForm} from '@/components'


export default function SignInPage() {
    return (
        <div className="flex-col justify-center pt-6 items-center max-w-2xl mx-auto">
            <h2 className={'text-2xl font-bold text-gray-500 text-center mb-4'}>Sign In</h2>
            <p className={'text-lg font-bold text-gray-500 text-center mb-4'}>Welcome back! Please sign in to continue</p>
            <SignInForm />
            <div className={'mt-6 text-base text-gray-500 text-center'}>
                Don’t have an account?
                <Link  className={'font-bold ml-2'} href={'/sign-up'}>Sign Up</Link>
            </div>
            <div className={'mt-4 text-base text-gray-500 text-center'}>
                Have forgotten password?
                <Link  className={'font-bold ml-2'} href={'/forgot-password'}>Forgot Password</Link>
            </div>




        </div>
    );
}