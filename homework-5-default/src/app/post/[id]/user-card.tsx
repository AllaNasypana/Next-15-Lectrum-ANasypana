import { getUserById } from '../actions';


interface IProps {
    userId: number
}

export default async function UserCard({userId}: IProps) {
    const user = await getUserById(userId);
    return (
        <div className={'flex justify-start items-center'}>
             <div className='text-lg font-bold text-gray-800 mr-4'>Post Author:</div>
            <div className='text-lg text-gray-800 mr-2'>{user.name}</div>
            <div className={'text-lg text-gray-800 italic'}>{user.email}</div>
        </div>
    );
}