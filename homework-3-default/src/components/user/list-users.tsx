'use client'

import { useUsers} from './useUsers'


interface IProps {
   userId: string;
}

export const Users = ({userId}: IProps) => {
    const {data, isPending, error} = useUsers();

    return (
        <div className={'w-full flex-col items-center justify-center'}>
            {isPending && !error && (<p className={'py-6 text-center text-2xl font-bold text-blue-500'}>Loading...</p>)}
            {!isPending && error && <p className={'py-6 text-center text-2xl font-bold text-red-700'}>{error.message}</p>}
            { !isPending && !error && data?.map((user) =>
                <div key={user.id} className={'flex w-full justify-between items-center gap-2 border-2 border-blue-100 rounded-xl p-6 bg-blue-50 mt-4 '}>
                    <div className={'font-bold text-lg mb-4'}>{user.name}</div>
                    <div className={'font-bold text-lg'}>{userId === user.user_id ? user.email : '*******'}</div>
                </div>
            )}

        </div>
    )
}
