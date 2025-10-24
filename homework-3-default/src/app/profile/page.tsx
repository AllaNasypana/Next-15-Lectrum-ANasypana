import { currentUser} from '@clerk/nextjs/server';
import { getUsers, createPost, getPosts } from './actions'

export default async function ProfilePage() {
    const user = await currentUser();
    const {data, error} = await getPosts();

    console.log(data)
    console.log(user?.id)



    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1>Profile</h1>
        </div>
    );
}