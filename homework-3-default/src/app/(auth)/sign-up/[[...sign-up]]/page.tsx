import {SignUpForm} from "@/components";
import Link from "next/link";


export default function SignUpPage() {
    return (
        <div className="flex-col justify-center pt-6 items-center max-w-2xl mx-auto">
            <h2 className={'text-2xl font-bold text-gray-500 text-center mb-4'}>Sign Up</h2>
            <p className={'text-lg font-bold text-gray-500 text-center mb-4'}>Welcome! Please sign up to continue</p>
            <SignUpForm />
            <div className={'mt-6 text-base text-gray-500 text-center'}>
                Have an account?
                <Link  className={'font-bold ml-2'} href={'/sign-in'}>Sign In</Link>
            </div>

        </div>
    );
}