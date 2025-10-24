
import {ForgotPasswordForm} from "@/components";
import Link from "next/link";


export default function ForgotPasswordPage() {
    return (
        <div className="flex-col justify-center pt-6 items-center max-w-2xl mx-auto">
            <h2 className={'text-2xl font-bold text-gray-500 text-center mb-4'}>Have forgotten password?</h2>
            <ForgotPasswordForm />
            <div className={'mt-6 text-base text-gray-500 text-center'}>
                Go to Sign In
                <Link  className={'font-bold ml-2'} href={'/sign-in'}>Sign In</Link>
            </div>
        </div>
    );
}