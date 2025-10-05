import { getUser } from '@/app/(shell)/actions';



export default async function UserProfilePage() {
    const user = await getUser();


    return (
        <div className="w-full flex-col justify-center items-center pt-6">
            <h2 className={'text-2xl text-typography-black my-3'}>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>

        </div>
    );
}