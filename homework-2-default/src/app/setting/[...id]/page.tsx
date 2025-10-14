import { LinkButton } from '@/components';

interface IProps {
    params: Promise<{ id: string[] }>;
};

export default async function SettingsDetailsPage({ params }: IProps) {
    const { id } = await params
    return (
        <>
            <h2 className={'font-bold text-3xl pt-6 center text-blue-700'}>Old Settings</h2>
            <div className={'py-6'}>
                <LinkButton  href={'/'}>Go to Home</LinkButton>
            </div>
            <h3 className={'font-bold text-xl pt-6 center text-typography-black'}>Policies of Security: {id.join('; ')}</h3>



        </>
    );
}