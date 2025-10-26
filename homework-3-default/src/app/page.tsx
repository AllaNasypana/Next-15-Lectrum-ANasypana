import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-6 flex flex-col justify-start items-start">
        <div className={'text-base mb-6'}>
            Currently, users are managed by Clerk, but the database exists in Supabase. To connect the database with users and later enable Row Level Security (RLS), it was  integrated Clerk authentication with Supabase. This ensures that each document with user field in the DB is linked to an authenticated user, allowing secure database operations

        </div>
        <h2  className={'text-lg mb-6 font-bold'}>How the Integration Works</h2>
        <div className={'text-base mb-2'}>Here’s an overview of what we aim to achieve:</div>
        <ul className={'text-base mb-6 list-disc px-6'}>
            <li className={''}>Clerk handles authentication, and we retrieve an auth token from Clerk.</li>
            <li className={''}>We pass this token to Supabase for authorization.</li>
            <li className={''}>Supabase uses this token to verify the identity of the user and ensures secure database operations.</li>
            <li className={''}>This setup allows us to enforce security policies later using RLS.</li>
        </ul>

        <div className={'bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-lg w-full'}>
            <div className={'font-bold text-typography-black text-lg mb-6'}>
                Authentication (auth routers), protected content (posts, profile, users)

            </div>
            <div className={'font-bold text-typography-black text-lg mb-6'}>
                Server Actions, CRUD:
                <Link className={'text-blue-500 hover:text-blue-700 mx-2'} href={'/posts'}>Posts</Link>

            </div>
            <div className={'font-bold text-typography-black text-lg mb-6'}>
                GraphQL:
                <Link className={'text-blue-500 hover:text-blue-700 ml-2'} href={'/users'}>Users</Link>
                <Link className={'text-blue-500 hover:text-blue-700 ml-2'} href={'/profile'}>Profile</Link>
            </div>
        </div>
    </div>
  );
}
