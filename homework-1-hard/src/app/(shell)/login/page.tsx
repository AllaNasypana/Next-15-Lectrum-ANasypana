
import {setCookie} from '../actions';

import { LoginForm} from '@/components'
export default async function LoginPage() {


    return (
        <div className="flex justify-center pt-6">

            <LoginForm onLogin={setCookie} />

        </div>
    );
}
