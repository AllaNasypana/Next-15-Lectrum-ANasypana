import { currentUser} from '@clerk/nextjs/server';
import { Users } from '@/components'

export default async function UserPage() {
    const user = await currentUser();
    return (
        <div className="w-full">
            <h1 className={'text-2xl text-gray-800 text-center font-bold m-6'}>Users</h1>
            <Users userId={user?.id || ''} />
        </div>
    );
}