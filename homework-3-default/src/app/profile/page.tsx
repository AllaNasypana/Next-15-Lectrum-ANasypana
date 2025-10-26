import { UserProfile } from '@/components';

export default async function ProfilePage() {
    return (
        <div className="w-full flex flex-col justify-center">
            <h1 className={'text-2xl text-gray-800 text-center font-bold m-6'}>User Profile</h1>
            <UserProfile  />
        </div>
    );
}