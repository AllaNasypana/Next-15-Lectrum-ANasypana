import Image from 'next/image'

export default function Home() {
  return (
    <>
     <h1 className={'text-xl font-bold text-center mb-5'}>Service Dog: who is it, how to get status in Ukraine and other countries</h1>
        <div className={'w-full flex justify-center aspect-[6/2] px-20'}>
            <Image
                className={'object-cover rounded-md'}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}

                src={'/images/dog.jpg'} alt={'Service Dog'} />
        </div>



    </>
  );
}
