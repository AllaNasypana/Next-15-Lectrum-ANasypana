import {Header } from '@/components'



export default async function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
       <>
           <Header />
           <main className={'p-4'}>
               {children}
           </main>
       </>
  );
}
