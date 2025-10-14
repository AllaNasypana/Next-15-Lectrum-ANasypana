import { setCookie } from '../actions';
import { LoginForm} from '@/components'

export default function LoginPage() {
    return (
        <div className="flex-col justify-center pt-6 items-center">
            <h2 className={'italic text-lg font-bold text-gray-500 text-center mb-6'}>It is just for testing:)</h2>

            <LoginForm onLogin={setCookie} />

        </div>
    );
}